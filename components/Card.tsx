import Link from "next/link";

import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

import { IFile } from "@/types/file";
import { convertFileSize } from "@/lib/utils";
import { IUser } from "@/types/user";

const Card = ({ file, user }: { file: IFile; user: IUser | null }) => {
  const isOwner = file.owner.$id === user?.$id;
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} isOwner={isOwner} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          {" "}
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
