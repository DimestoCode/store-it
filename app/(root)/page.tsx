import Image from "next/image";
import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalUsedSpace } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const [files, totalUsedSpace, user] = await Promise.all([
    getFiles({
      types: [],
      limit: 10,
    }),
    getTotalUsedSpace(),
    getCurrentUser(),
  ]);

  const usageSummary = getUsageSummary(totalUsedSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalUsedSpace.used} />

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>
                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <p className="text-center">Last update</p>
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files && files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files?.documents.map((file) => (
              <Link
                key={file.$id}
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown
                    className="shrink-0"
                    file={file}
                    isOwner={file.owner.$id === user?.$id}
                  />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
}
