import { createContext } from "@bereans/api/context";
import { appRouter } from "@bereans/api/routers/index";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req) as any,
  });
}
export { handler as GET, handler as POST };
