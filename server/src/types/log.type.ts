type LogType = "WARNING" | "INFO" | "ERROR";
type IP_ADDR = string;
type LOCATION = {
  X: number;
  Y: number;
};
type IP = {
  address: IP_ADDR;
  location: LOCATION;
};
type Log = {
  date: Date;
  type: LogType;
  src: IP;
  dst: string;
  msg: string;
};

export { Log, LogType, IP, IP_ADDR };
