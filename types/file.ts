import { type Models } from "node-appwrite";

export interface IFile extends Models.Document {
  url: string;
  type: FileType;
  accountId: string;
  owner: string;
  extension: string;
  size: number;
  users: string[];
}

export type FileResponse = Models.DocumentList<IFile>;
