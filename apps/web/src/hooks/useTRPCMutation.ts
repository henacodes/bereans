// src/hooks/useTRPCMutation.ts
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type InferMutInput<F> = F extends () => UseMutationOptions<
  infer _O,
  any,
  infer I,
  any
>
  ? I
  : never;
type InferMutOutput<F> = F extends () => UseMutationOptions<
  infer O,
  any,
  any,
  any
>
  ? O
  : never;

export function useTRPCMutation<
  P extends { mutationOptions: () => UseMutationOptions<any, any, any, any> }
>(proc: P) {
  type I = InferMutInput<P["mutationOptions"]>;
  type O = InferMutOutput<P["mutationOptions"]>;
  // You still get full TS inference for input/output here:
  return useMutation<O, unknown, I>(proc.mutationOptions());
}
