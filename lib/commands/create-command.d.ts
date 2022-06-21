import { BaseCommand, IAttribute } from "@point-hub/express-cli";
export declare class CreateCommand extends BaseCommand {
    attribute(): IAttribute;
    handle(name: string): Promise<void>;
}
