import Image from "next/image";
import React from "react";

import { Button } from "./ui/button";
import Search from "./Search";
import FileUploader from "./FileUploader";

import { signOutUser } from "@/lib/actions/user.actions";

type HeaderProps = {
  accountId: string;
  userId: string;
};

const Header = ({ accountId, userId }: HeaderProps) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader accountId={accountId} ownerId={userId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
