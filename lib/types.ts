/*!
 *
 * Routes, Request and Response Data Types
 *
 */

type Routes = {
  path: string;
  reg: RegExp;
  method: string;
  hand(req: Req, res: Res): void;
};

type Res = {
  reply: string | Record<string | number, string | number>;
  headers: Record<string, string>;
  status: number;
};

type Req = {
  body?: string;
  headers?: Headers;
  method?: string;
  url?: string;
};

export type { Req, Res, Routes };
