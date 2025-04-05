import { type Models } from "node-appwrite";
import { IUser } from "./user";

export interface IFile extends Models.Document {
  url: string;
  type: FileType;
  accountId: string;
  bucketFileId: string;
  owner: IUser;
  name: string;
  extension: string;
  size: number;
  users: string[];
}

export type FileResponse = Models.DocumentList<IFile>;
