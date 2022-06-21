import path from "path";
import { fileURLToPath } from "url";

export const srcDir = path.dirname(fileURLToPath(import.meta.url));
export const stubDir = `${srcDir}/stub`;

export function packageNameValid(name: string) {
  const regexp = new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$");
  if (!regexp.test(name)) {
    return false;
  }

  return true;
}
