export type FilterOutVoid<T> = T extends void ? never : T;
