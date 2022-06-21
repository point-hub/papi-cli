import { createRequire } from "module";
import { ExpressCli } from "@point-hub/express-cli";
// Import commands
import { CreateCommand } from "./commands/create-command.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const expressCli = new ExpressCli("cli", version);
// Register commands
expressCli.register(CreateCommand);
// Publish CLI
expressCli.build();
