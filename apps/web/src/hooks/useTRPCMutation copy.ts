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
>(
  proc: P,
  options?: Partial<
    UseMutationOptions<
      InferMutOutput<P["mutationOptions"]>,
      unknown,
      InferMutInput<P["mutationOptions"]>
    >
  >
) {
  type I = InferMutInput<P["mutationOptions"]>;
  type O = InferMutOutput<P["mutationOptions"]>;

  const mutationOpts = proc.mutationOptions();
  const mergedOptions = { ...mutationOpts, ...options } as UseMutationOptions<
    O,
    unknown,
    I
  >;

  return useMutation<O, unknown, I>(mergedOptions);
}
