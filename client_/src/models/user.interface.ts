import ISettings from "./settings.interface";

export default interface IUser {
  claims: string[];
  name: string;
  settings: ISettings;
}
