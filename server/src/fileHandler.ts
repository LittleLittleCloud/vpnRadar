import { watch, statSync, openSync, readSync } from "fs";
import { LogHandler } from "./logHandler";
import { Log } from "./types/log.type";
import { Mutex } from "./utils/mutex";
import { EventEmitter } from "events";
import { IpHandler } from "./ipHandler";
export class FileHandler {
  //2019-04-03 23:05:32 INFO     connecting clients1.google.com:443 from 202.117.43.74:4665
  private info_regex = /([\d-: ]*) INFO [ ]*connecting ([\w\d.:]*) from ([\w\d.:]*)/;

  private _untraced_log: Log[] = [];
  private _mutex: Mutex = new Mutex();
  private _ee: EventEmitter = new EventEmitter();

  async change() {
    await this._mutex.acquire();
    const stat = statSync(this.filePath);
    const fd = openSync(this.filePath, "r");
    let buffer = new Buffer(stat.size - this.fileCursor);
    try {
      readSync(fd, buffer, 0, stat.size - this.fileCursor, this.fileCursor);
    } catch (e) {
      this._mutex.release();
      this._ee.emit("change");
    }
    this.fileCursor = stat.size;
    const newLines = buffer.toString().split(/(?:\r\n|\r|\n)/g);
    newLines.forEach(async (val, line) => {
      const info = val.match(this.info_regex);
      if (info) {
        const ip = new IpHandler(info[3]);
        await ip.Ready; //wait IP to be ready
        const log = new LogHandler(new Date(info[1]), "INFO", ip, info[2], val);
        log.Create().then(() => {
          console.log("log success");
        });
        // put log in _untraced_log
        this._untraced_log.push(log.toLog());
      }
    });
    this._mutex.release();
  }

  constructor(private filePath: string, private fileCursor: number) {
    this._ee.on("change", async () => {
      await this.change();
    });
    const that = this;
    watch(this.filePath, async (eventType, filename) => {
      if (eventType == "change" && filename == that.filePath) {
        that._ee.emit("change");
      }
    });
  }

  async getUpdatedLog(): Promise<Log[]> {
    await this._mutex.acquire();
    const tmp = this._untraced_log;
    this._untraced_log = [];
    this._mutex.release();
    return tmp;
  }
}
