import fs from "fs";
import path from "path";
import { BaseCommand, IAttribute } from "@point-hub/express-cli";
import { fileExists, fileCopy } from "@point-hub/express-utils";
import chalk from "chalk";
import { stubDir, packageNameValid } from "../helper.js";

export class CreateCommand extends BaseCommand {
  attribute(): IAttribute {
    return {
      name: "create",
      description: "Create new API Project",
      summary: "create new api project",
      arguments: [
        {
          name: "<name>",
          description: "project name",
        },
      ],
      options: [],
    };
  }
  async handle(name: string): Promise<void> {
    if (!packageNameValid) {
      console.error(
        chalk.red(
          `The name of the package does not match the pattern of "^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"`
        )
      );
      return;
    }

    const dir = `${name}`;

    if (fileExists(`${dir}`)) {
      console.error(chalk.red(`Directory "${dir}" is exists!`));
      return;
    }

    fileCopy(path.resolve(stubDir, "./papi"), dir);
    const stub = fs.readFileSync(path.resolve(stubDir, "./papi/package.json")).toString().replace("package-name", name);
    fs.writeFileSync(`${dir}/package.json`, stub);

    console.info(`Successfully created project ${chalk.green(name)}`);
    console.info(`Get started with the following commands:`);
    console.info();
    console.info(`${chalk.gray("$ cd " + dir)}`);
    console.info(`${chalk.gray("$ npm install")}`);
    console.info(`${chalk.gray("$ npm run build")}`);
  }
}
