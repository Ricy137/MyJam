/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-pwa/client" />

import { ethers } from "ethers";

type ValueOf<T> = T[keyof T];

type OverWrite<T, U> = Omit<T, keyof U> & U;
type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PartialOmit<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

interface Ethereum extends ethers.BrowserProvider {
  networkVersion: string | undefined;
  request: (args: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<string[]>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
  type OverWrite<T, U> = Omit<T, keyof U> & U;
  type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  type PartialOmit<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;
}
