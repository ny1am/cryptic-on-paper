import {
  mirrorCypherFactory,
  railFenceCypherFactory,
  toggleCaseCypherFactory,
} from '@/features/cypher';

export const cyphersRegister = Object.freeze({
  mirror: mirrorCypherFactory,
  railFence: railFenceCypherFactory,
  toggleCase: toggleCaseCypherFactory,
});

export type CyphersOptionsRegister = {
  [K in keyof typeof cyphersRegister]: Parameters<typeof cyphersRegister[K]> extends [
    infer A
  ]
    ? A
    : undefined;
};

export type CypherKeyWhenRequiredOptions = {
  [K in keyof CyphersOptionsRegister]: CyphersOptionsRegister[K] extends undefined
    ? never
    : K;
}[keyof CyphersOptionsRegister];

export type CypherMeta = {
  [K in keyof CyphersOptionsRegister]: {
    key: K;
    options: CyphersOptionsRegister[K];
  };
}[keyof CyphersOptionsRegister];
