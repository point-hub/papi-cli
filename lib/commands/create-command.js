import fs from "fs";
import path from "path";
import { BaseCommand, Color } from "@point-hub/express-cli";
import { fileExists, fileCopy } from "@point-hub/express-utils";
import { stubDir, packageNameValid } from "../helper.js";
export class CreateCommand extends BaseCommand {
    constructor() {
        super({
            name: "create",
            description: "Create new API Project",
            summary: "create new api project",
            arguments: [
                {
                    name: "name",
                    description: "Name of the project",
                },
            ],
            options: [],
        });
    }
    async handle() {
        if (!packageNameValid) {
            console.error(Color.red(`The name of the package does not match the pattern of "^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"`));
            return;
        }
        const dir = `${this.args.name}`;
        if (fileExists(`${dir}`)) {
            console.error(Color.red(`Directory "${dir}" is exists!`));
            return;
        }
        fileCopy(path.resolve(stubDir, "./papi"), dir);
        const stub = fs
            .readFileSync(path.resolve(stubDir, "./papi/package.json"))
            .toString()
            .replace("package-name", this.args.name);
        fs.writeFileSync(`${dir}/package.json`, stub);
        console.info(`Successfully created project ${Color.green(this.args.name)}`);
        console.info(`Get started with the following commands:`);
        console.info();
        console.info(`${Color.gray("$ cd " + dir)}`);
        console.info(`${Color.gray("$ npm install")}`);
        console.info(`${Color.gray("$ npm run build")}`);
    }
}
