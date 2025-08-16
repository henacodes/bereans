// src/hooks/useTRPCQuery.ts
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

type InferQueryInput<F> = F extends (
  input: infer I
) => UseQueryOptions<any, any, any, any>
  ? I
  : never;

type InferQueryOutput<F> = F extends (
  input: any
) => UseQueryOptions<infer O, any, any, any>
  ? O
  : never;

export function useTRPCQuery<
  P extends {
    queryOptions: (input: any) => UseQueryOptions<any, any, any, any>;
  }
>(
  proc: P,
  input: InferQueryInput<P["queryOptions"]>,
  options?: Omit<
    UseQueryOptions<
      InferQueryOutput<P["queryOptions"]>,
      unknown,
      InferQueryOutput<P["queryOptions"]>,
      readonly unknown[]
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<InferQueryOutput<P["queryOptions"]>> {
  type O = InferQueryOutput<P["queryOptions"]>;

  // get queryOptions from trpc
  const baseOptions = proc.queryOptions(input);

  // merge with user overrides
  const mergedOptions: typeof baseOptions = {
    ...baseOptions,
    ...options,
  };

  return useQuery<O>(mergedOptions);
}
