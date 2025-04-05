"use client";

import { ActionDispatch, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ActionDropdownAction } from "./reducer";

// Patterns: Template Method
export const ActionDialog = ({
  action,
  children,
  onCancelAction,
  handleActionCallbacksMap,
}: {
  action: ActionType;
  onCancelAction: () => void;
  handleActionCallbacksMap: {
    [key: string]: () => Promise<unknown>;
  };
  dispatch: ActionDispatch<[action: ActionDropdownAction]>;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { value, label } = action;

  const onHandleAction = async () => {
    let success = false;
    setIsLoading(true);

    success = !!(await handleActionCallbacksMap[value]());
    if (success) {
      setIsLoading(false);
      onCancelAction();
    }
  };

  return (
    <DialogContent className="shad-dialog button">
      <DialogHeader className="flex flex-col gap-3">
        <DialogTitle className="text-center text-light-100">
          {label}
        </DialogTitle>
        {children}
      </DialogHeader>
      <DialogDescription />
      {["rename", "share", "delete"].includes(value) && (
        <DialogFooter className="flex flex-col gap-3 md:flex-row">
          <Button onClick={onCancelAction} className="modal-cancel-button">
            Cancel
          </Button>
          <Button onClick={onHandleAction} className="modal-submit-button">
            <p className="capitalize">{value}</p>
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                width={24}
                height={24}
                alt="loader"
                className="animate-spin"
              />
            )}
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  );
};
