import { ICrud } from "./crud.interface";
import { Log, LogType, IP } from "./types/log.type";
import { DB } from "./database";

export class LogHandler implements ICrud<Log> {
  constructor(
    private date: Date,
    private type: LogType,
    private src: IP,
    private dst: string,
    private msg: string
  ) {}
  Create() {
    const sql = `INSERT INTO LOGS (DATE, TYPE, SRC, DST, MSG, LOCATION ) VALUES ('${this.date.toUTCString()}','${
      this.type
    }','${this.src.address}','${this.dst}','${this.msg}','${
      this.src.location
    }')`;
    return new Promise<boolean>((res, rej) => {
      DB.exec(sql, err => {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      });
    });
  }
  Write() {
    return Promise.resolve(false);
  }
  Update() {
    return Promise.resolve(false);
  }
  Delete() {
    return Promise.resolve(false);
  }

  toLog(): Log {
    return {
      date: this.date,
      type: this.type,
      src: this.src,
      dst: this.dst,
      msg: this.msg
    };
  }
}
