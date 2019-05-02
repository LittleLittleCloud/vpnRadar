import { watch, statSync, readSync, openSync } from "fs";
import { LogHandler } from "./logHandler";
import { Log } from "./types/log.type";
export class FileHandler {
  //2019-04-03 23:05:32 INFO     connecting clients1.google.com:443 from 202.117.43.74:4665
  private info_regex = /([\d-: ]*) INFO [ ]*connecting ([\w\d.:]*) from ([\w\d.:]*)/;

  private _untraced_log: Log[];
  constructor(private filePath: string, private fileCursor: number) {
    watch(this.filePath, (eventType, filename) => {
      if (eventType == "change") {
        const stat = statSync(filename);
        const fd = openSync(filePath, "a");
        let buffer = new Buffer(stat.size - this.fileCursor);
        readSync(fd, buffer, 0, stat.size - this.fileCursor, this.fileCursor);
        this.fileCursor = stat.size;
        const newLines = buffer.toString().split(/(?:\r\n|\r|\n)/g);
        newLines.forEach((val, line) => {
          const info = val.match(this.info_regex);
          if (info) {
            const log = new LogHandler(
              new Date(info[1]),
              "INFO",
              {
                address: info[4],
                location: {
                  X: 0.0,
                  Y: 0.0
                }
              },
              info[3],
              val
            );
            log.Create().then(() => {
              console.log("log success");
            });
            // put log in _untraced_log
            this._untraced_log.push(log.toLog());
          }
        });
      }
    });
  }

  getUpdatedLog(): Log[] {
    const tmp = this._untraced_log;
    this._untraced_log = [];
    return tmp;
  }
}
