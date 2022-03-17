export interface BaseFactory<I> {
  build(args?: Partial<I>): I;
  buildMany(count: number, args?: Partial<I>): I[];
}
