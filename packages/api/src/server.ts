import "server-only"; // Ensures this module runs only on the server
import { headers } from "next/headers";
import { cache } from "react";
import { appRouter } from "./routers";
import { createInnerTRPCContext } from "./context";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");
  return createInnerTRPCContext({
    headers: heads,
  });
});

type RouterCaller = ReturnType<typeof appRouter.createCaller>;
export const api: RouterCaller = appRouter.createCaller(createContext);
