import { IFile } from "@/types/file";
import React from "react";

const Card = ({ file }: { file: IFile }) => {
  return <div>{file.name}</div>;
};

export default Card;
