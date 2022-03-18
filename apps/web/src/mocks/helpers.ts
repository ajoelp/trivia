export function respondWithData<T>(data: T, status: number = 200) {
  return (req: any, res: any, ctx: any) => {
    return res(ctx.status(status), ctx.json(data));
  };
}

export function respondWithLoadingState<T>(data: T, status: number = 200) {
  let resolve: (...args: any) => void = () => {};

  const promise = () =>
    new Promise((res) => {
      resolve = res;
    });

  const handler = async (req: any, res: any, ctx: any) => {
    await promise();
    return res(ctx.status(status), ctx.json(data));
  };

  return { handler, resolve };
}
