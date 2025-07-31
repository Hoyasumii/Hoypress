// biome-ignore lint/correctness/noUnusedVariables: .
export interface Service<Repository, Args, ReturnType> {
  run(data: Args): Promise<ReturnType>;
}
