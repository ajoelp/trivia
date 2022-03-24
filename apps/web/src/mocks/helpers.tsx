import { Control, useForm, UseFormWatch } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import { render } from "@testing-library/react";
import { UnpackNestedValue } from "react-hook-form/dist/types";

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

type RenderControllerCallback = (control: Control) => ReactNode;
export const renderController = (component: RenderControllerCallback) => {
  let watchResult: () => Record<string, any> = () => ({});
  const Component = () => {
    const { watch, control } = useForm();

    useEffect(() => {
      watchResult = watch;
    }, []);

    return <>{component(control)} </>;
  };

  render(<Component />);

  return watchResult;
};
