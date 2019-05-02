import configJson from "./config.json";
import { writeFileSync } from "fs";
export function writeConfig() {
  writeFileSync(Config.log_file, Config);
}
const Config = configJson;

export { Config };
