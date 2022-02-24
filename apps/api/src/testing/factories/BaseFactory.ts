export interface BaseFactory<I, T> {
  build(args?: Partial<I>): I;
  create(args?: Partial<I>): Promise<T>;
  createMany(count: number, args?: Partial<I>): Promise<T[]>;
}
