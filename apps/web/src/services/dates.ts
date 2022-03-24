import { formatDistanceToNow, parseISO } from "date-fns";

export class DateTime {
  static from(iso: string): DateTime {
    return new DateTime(iso);
  }

  constructor(public iso: string) {}

  get date() {
    return parseISO(this.iso);
  }

  get toNow(): string {
    return formatDistanceToNow(this.date);
  }
}
