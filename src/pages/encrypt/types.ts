import { RailFenceCypherOptions } from '@/features/cypher';

export type CypherOptionsDef = {
  mirror: void;
  railFence: RailFenceCypherOptions;
};

//TODO: derive from CypherOptionsDef
export type CypherMeta =
  | { name: 'mirror' }
  | { name: 'railFence'; opts: RailFenceCypherOptions };
