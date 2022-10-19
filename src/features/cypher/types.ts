export type Cypher = (input: string) => string;
export type CypherFactory<T = void> = T extends void ? () => Cypher : (opts: T) => Cypher;
