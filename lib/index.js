import { createRequire } from "module";
import { ExpressCli } from "@point-hub/express-cli";
// Import commands
import { CreateCommand } from "./commands/create-command.js";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");
const cli = new ExpressCli("papi", version);
// Register commands
cli.register(new CreateCommand());
// Publish CLI
cli.run(process.argv);
