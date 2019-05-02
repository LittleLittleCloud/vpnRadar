export interface ICrud<T> {
  Create(): Promise<boolean>; // temporarily use boolean
  Write(): Promise<boolean>;
  Update(): Promise<boolean>;
  Delete(): Promise<boolean>;
}
