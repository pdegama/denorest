// Copyright 2022 Parthka. All rights reserved. MIT license.

/** Routes data type */
type Routes = {
  path: string;
  reg: RegExp;
  method: string;
  hand: ((req: Req, res: Res) => void)[];
};

/** The second parameter of the handler function is Res. */
type Res = {
  reply: BodyInit;
  headers: Record<string, string>;
  status: number;
};

/** The first parameter of the handler function is Req. */
type Req = {
  body?: string;
  headers?: Headers;
  method?: string;
  url?: URL;
  reg?: RegExp;
  state: Record<string | number, string | number | boolean>;
};

// export data type
export type { Req, Res, Routes };
