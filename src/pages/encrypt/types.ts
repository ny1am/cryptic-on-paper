import { RailFenceCypherOptions } from '@/features/cypher';

export type CypherMeta =
  | { name: 'mirror' }
  | { name: 'railFence'; opts: RailFenceCypherOptions };
