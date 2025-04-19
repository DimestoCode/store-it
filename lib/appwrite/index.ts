"use server";
import { Account, Client, Databases, Storage, Avatars } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getInitialClient = () => {
  return new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);
};

const createClientGetters = (client: Client) => {
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createSessionClient = async () => {
  const client = getInitialClient();

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) {
    redirect("/sign-in");
  }

  client.setSession(session.value);

  return createClientGetters(client);
};

export const createAdminClient = async () => {
  const client = getInitialClient().setKey(appwriteConfig.secretKey);

  return {
    ...createClientGetters(client),
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
