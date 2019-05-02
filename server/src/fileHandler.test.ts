import { Config } from "./config";
import {
  unlinkSync,
  existsSync,
  writeFileSync,
  appendFileSync,
  appendFile
} from "fs";
import { FileHandler } from "./fileHandler";
import assert from "assert";
const TEST_INFO = [
  "2019-04-04 00:29:26 INFO     connecting mtalk.google.com:5228 from 202.117.43.74:4706",
  "2019-04-04 00:23:55 INFO     connecting ios.rqd.qq.com:443 from 101.94.97.120:58387",
  "2019-04-04 00:21:16 INFO     connecting clients4.google.com:443 from 202.117.43.74:4703"
];
describe("test fileHander", async () => {
  before("use test DB and test file", async () => {
    Config.db_path = "test.db";
    Config.log_file = "test.log";
    // create test.log
    writeFileSync(Config.log_file, "");
  });
  after("remove test db and log", async () => {
    if (existsSync(Config.db_path)) {
      unlinkSync(Config.db_path);
    }
    if (existsSync(Config.log_file)) {
      unlinkSync(Config.log_file);
    }
  });
  it("test info ", async () => {
    const fileHandler = new FileHandler(Config.log_file, 0);

    appendFile(Config.log_file, TEST_INFO[0], () => {
      assert(fileHandler.getUpdatedLog()[0].msg == TEST_INFO[0]);
    });
    appendFileSync(Config.log_file, TEST_INFO[1]);
    appendFileSync(Config.log_file, TEST_INFO[2]);
    assert(fileHandler.getUpdatedLog().length == 2);
  });
});
