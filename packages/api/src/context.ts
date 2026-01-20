import type { NextRequest } from "next/server";

import { auth } from "@bereans/auth";
import type { IncomingHttpHeaders } from "http";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

function toWebHeaders(headers: IncomingHttpHeaders): Headers {
  const h = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      value.forEach((v) => h.append(key, v));
    } else if (value !== undefined) {
      h.append(key, value as string);
    }
  }
  return h;
}

export const createInnerTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });
  return {
    session,
    headers: opts.headers,
  };
};

export const createTRPCContext = async (
  opts:
    | { req: CreateNextContextOptions["req"] }
    | { req: NextRequest }
    | { req: Request }
    | { headers: Headers },
) => {
  let headers: Headers;

  if ("req" in opts && opts.req) {
    // Fetch API Request or NextRequest (both have headers as Headers)
    if (opts.req.headers && opts.req.headers instanceof Headers) {
      headers = opts.req.headers;
    } else if (opts.req.headers && typeof opts.req.headers === "object") {
      // Node.js IncomingHttpHeaders, convert
      headers = toWebHeaders(opts.req.headers as IncomingHttpHeaders);
    } else {
      throw new Error("Could not extract headers from provided req");
    }
  } else if ("headers" in opts && opts.headers instanceof Headers) {
    headers = opts.headers;
  } else {
    throw new Error("Could not determine headers for tRPC context");
  }

  return await createInnerTRPCContext({ headers });
};

export async function createContext(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createInnerTRPCContext>>;
