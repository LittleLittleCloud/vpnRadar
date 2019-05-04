import { get } from "http";
import { LOCATION } from "./types/log.type";

export class IpHandler {
  private api = "http://ip-api.com/json/";
  public location: LOCATION = { X: 0, Y: 0 };
  public Ready: Promise<any>;
  constructor(public address: string) {
    const re = /^[^:]*/;
    const ip = address.match(re);
    if (ip) {
      const url = `${this.api}${ip[0]}?fields=lat,lon`;
      this.Ready = new Promise((resolve, rej) => {
        get(url, res => {
          let data = "";
          res.on("data", chunk => {
            data += chunk;
          });
          res.on("end", () => {
            const json = JSON.parse(data);
            this.location.X = json.lat;
            this.location.Y = json.lon;
            resolve();
          });
        }).on("error", err => {
          rej(err);
        });
      });
    } else {
      throw Error("ip not match");
    }
  }

  toString() {
    return JSON.stringify({
      address: this.address,
      location: {
        X: this.location.X,
        Y: this.location.Y
      }
    });
  }
}

// const ip = new IpHandler("101.94.97.120:5555");
// ip.Ready.then(val => {
//   console.log(ip.toString());
// });
