"use client";
import { useReducer } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameDialog, FileDetails, ShareDialog } from "./ActionsModalContent";

import type { IFile } from "@/types/file";
import { actionDropdownReducer, getInitialState } from "./reducer";
import { actionsDropdownItems } from "@/const";
import { constructDownloadUrl } from "@/lib/utils";
import { renameFile, updateFileUsers } from "@/lib/actions/file.actions";
import { ActionDialog } from "./ActionDialog";

const modalItemsList = ["rename", "share", "delete", "details"];

const ActionDropdown = ({ file }: { file: IFile }) => {
  const path = usePathname();

  const [state, dispatch] = useReducer(
    actionDropdownReducer,
    getInitialState(file)
  );
  const { isModalOpen, isDropdownOpen, action } = state;

  const renderActionItem = (actionItem: ActionType) => {
    const actionItemContent = (
      <>
        <Image
          src={actionItem.icon}
          alt={actionItem.label}
          width={30}
          height={30}
        />
        {actionItem.label}
      </>
    );

    if (actionItem.value === "download") {
      return (
        <Link
          href={constructDownloadUrl(file.bucketFileId)}
          download={file.name}
          className="flex items-center gap-2"
        >
          {actionItemContent}
        </Link>
      );
    }
    return <div className="flex items-center gap-2">{actionItemContent}</div>;
  };

  // Patterns: Factory
  const renderDialogContentModal = () => {
    if (!action) return null;

    const { value: type } = action;
    switch (type) {
      case "rename":
        return (
          <RenameDialog
            name={state.name}
            setName={(name) =>
              dispatch({
                type: "SET_NAME",
                payload: name,
              })
            }
          />
        );
      case "share":
        return (
          <ShareDialog
            file={file}
            onInputChange={(emails) =>
              dispatch({ type: "SET_EMAILS", payload: emails })
            }
            onRemove={async (emailToRemove: string) => {
              const updatedEmails = state.emails.filter(
                (email) => email !== emailToRemove
              );

              const success = await updateFileUsers({
                fileId: file.$id,
                emails: updatedEmails,
                path,
              });

              if (success) {
                dispatch({
                  type: "SET_EMAILS",
                  payload: updatedEmails,
                });
              }
            }}
          />
        );
      //   case "delete":
      //     return <DeleteActionModal />;
      case "details":
        return <FileDetails file={file} />;
      default:
        return null;
    }
  };

  const onCancelAction = () => {
    dispatch({ type: "CANCEL_ACTION", payload: getInitialState(file) });
  };

  // Patterns: Command
  const handleActionCallbacksMap = {
    rename: () =>
      renameFile({
        extension: file.extension,
        fileId: file.$id,
        name: state.name,
        path,
      }),

    share: () =>
      updateFileUsers({ fileId: file.$id, emails: state.emails, path }),
    delete: async () => console.log("delete"),
  } as const;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(val) => dispatch({ type: "SET_MODAL_OPEN", payload: val })}
    >
      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={(val) => {
          dispatch({ type: "SET_DROPDOWN_OPEN", payload: !!val });

          console.log("updated");
        }}
      >
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                dispatch({ type: "SET_ACTION", payload: actionItem });

                if (modalItemsList.includes(actionItem.value)) {
                  dispatch({ type: "SET_MODAL_OPEN", payload: true });
                }
              }}
            >
              {renderActionItem(actionItem)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {action && (
        <ActionDialog
          action={action}
          onCancelAction={onCancelAction}
          handleActionCallbacksMap={handleActionCallbacksMap}
          dispatch={dispatch}
        >
          {renderDialogContentModal()}
        </ActionDialog>
      )}
    </Dialog>
  );
};

export default ActionDropdown;
