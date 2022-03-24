import { v4 as uuid } from "uuid";

export type ToastMessageTypes = "success" | "error" | "warning";

export interface ToastMessage {
  message: string;
  type: ToastMessageTypes;
  duration?: number;
  remove(): void;
}

export type MessagesList = Map<string, ToastMessage>;
export type MessageEntries = [string, ToastMessage][];

export type Callback = (messages: MessageEntries) => void;

export const DEFAULT_DURATION = 1500;

export default class ToastProvider {
  messages: MessagesList = new Map();
  subscribers: Set<Callback> = new Set();

  subscribe(callback: Callback) {
    this.subscribers.add(callback);
    return this;
  }

  unsubscribe(callback: Callback) {
    this.subscribers.delete(callback);
    return this;
  }

  success(message: string, duration = DEFAULT_DURATION) {
    return this.add("success", message, duration);
  }

  error(message: string, duration = DEFAULT_DURATION) {
    return this.add("error", message, duration);
  }

  warning(message: string, duration = DEFAULT_DURATION) {
    return this.add("warning", message, duration);
  }

  private add(type: ToastMessageTypes, message: string, duration?: number): string {
    const key = uuid();
    this.addMessage(key, {
      type,
      message,
      duration,
      remove: () => {
        this.removeMessage(key);
      },
    });

    if (duration) {
      setTimeout(() => {
        this.removeMessage(key);
      }, duration);
    }

    return key;
  }

  private addMessage(key: string, message: ToastMessage): void {
    if (this.messages.has(key)) return;
    this.messages.set(key, message);
    this.sendMessageToSubscribers();
  }

  private removeMessage(key: string): void {
    if (!this.messages.has(key)) return;
    this.messages.delete(key);
    this.sendMessageToSubscribers();
  }

  private sendMessageToSubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber([...this.messages.entries()]);
    });
  }
}
