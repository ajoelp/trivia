import ToastProvider, { ToastMessage, ToastMessageTypes } from "./ToastProvider";

describe("ToastProvider", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  function assertHasMessage(provider: ToastProvider, messageFragment: Partial<ToastMessage>) {
    expect([...provider.messages.values()]).toEqual(expect.arrayContaining([expect.objectContaining(messageFragment)]));
  }

  function assertMissingMessage(provider: ToastProvider, messageFragment: Partial<ToastMessage>) {
    expect([...provider.messages.values()]).not.toEqual(
      expect.arrayContaining([expect.objectContaining(messageFragment)]),
    );
  }

  const types: ToastMessageTypes[] = ["success", "warning", "error"];

  it.each(types)("will add a %s message to the map", (type) => {
    const message = "this is the message";
    const provider = new ToastProvider();
    const id = provider.add(type, message);

    assertHasMessage(provider, {
      type,
      message,
    });

    expect(provider.messages.get(id)).toEqual(expect.objectContaining({ type, message }));
  });

  it("will remove a message after duration", () => {
    const message = "this is the message";
    const duration = 1000;
    const provider = new ToastProvider();
    provider.add("success", message, duration);

    expect([...provider.messages.values()]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "success",
          message,
        }),
      ]),
    );

    assertHasMessage(provider, {
      type: "success",
      message,
    });

    jest.advanceTimersByTime(duration + 1);

    assertMissingMessage(provider, {
      type: "success",
      message,
    });
  });

  it("will subscribe to updates", () => {
    const subscriber = jest.fn();
    const message = "this is the message";
    const duration = 1000;
    const provider = new ToastProvider();

    provider.subscribe(subscriber);
    provider.add("success", message, duration);

    expect(subscriber).toHaveBeenCalledWith(
      expect.arrayContaining([[expect.anything(), expect.objectContaining({ message, duration })]]),
    );

    jest.advanceTimersByTime(duration + 1);

    expect(subscriber).toHaveBeenCalledWith([]);
  });

  it("will not send message to unsubscribed subscriber", () => {
    const subscriber = jest.fn();
    const unSubscriber = jest.fn();
    const message = "this is the message";
    const duration = 1000;
    const provider = new ToastProvider();

    provider.subscribe(subscriber).subscribe(unSubscriber).unsubscribe(unSubscriber);
    provider.add("success", message, duration);

    expect(subscriber).toHaveBeenCalledWith(
      expect.arrayContaining([[expect.anything(), expect.objectContaining({ message, duration })]]),
    );
    expect(unSubscriber).not.toHaveBeenCalled();

    jest.advanceTimersByTime(duration + 1);

    expect(subscriber).toHaveBeenCalledWith([]);
    expect(unSubscriber).not.toHaveBeenCalled();
  });
});
