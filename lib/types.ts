/*!
 *
 * Routes, Request and Response Data Types
 *
 */

// Routes data type
type Routes = {
  path: string;
  reg: RegExp;
  method: string;
  hand:((req: Req, res: Res) => void)[];
};

// Response data type
type Res = {
  reply: string | Record<string | number, string | number>;
  headers: Record<string, string>;
  status: number;
};

// Request data type
type Req = {
  body?: string;
  headers?: Headers;
  method?: string;
  url?: URL;
  reg?: RegExp;
  state: Record<string | number, string | number>
};

// export data type
export type { Req, Res, Routes };
