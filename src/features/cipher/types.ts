export type Cipher = (input: string) => string;
export type CipherFactory<T = void> = T extends void ? () => Cipher : (opts: T) => Cipher;
