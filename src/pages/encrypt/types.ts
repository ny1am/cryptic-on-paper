import { RailFenceCypherOptions } from '@/features/cypher';

export type CypherOptionsDef = {
  mirror: void;
  railFence: RailFenceCypherOptions;
};

export type CypherMeta = {
  [Prop in keyof CypherOptionsDef]: {
    name: Prop;
    opts: CypherOptionsDef[Prop] extends void ? undefined : CypherOptionsDef[Prop];
  };
}[keyof CypherOptionsDef];
