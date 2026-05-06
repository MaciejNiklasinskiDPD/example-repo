import Database from "./persistence";
import Server from "./server";

export const getDatabase = () => new Database();
export const getServer = () => new Server();
