export function respondWithData<T>(data: T, status: number = 200, once = false) {
  return (req: any, res: any, ctx: any) => {
    const method = once ? res.once : res;
    return method(ctx.status(status), ctx.json(data));
  };
}

export function respondWithLoadingState<T>(data: T, status: number = 200, once = false) {
  let resolve: (...args: any) => void = () => {};

  const promise = () =>
    new Promise((res) => {
      resolve = res;
    });

  const handler = async (req: any, res: any, ctx: any) => {
    const method = once ? res.once : res;
    await promise();
    return method(ctx.status(status), ctx.json(data));
  };

  return { handler, resolve };
}
