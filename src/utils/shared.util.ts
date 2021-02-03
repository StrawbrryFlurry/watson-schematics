export const isNil = (u: unknown): u is null | undefined =>
  u === null || typeof u === "undefined";
