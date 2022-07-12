// Copyright 2022 Parthka. All rights reserved. MIT license.

import { Req } from "../types.ts";

/** Get Query And Parameter Function. */
export const pathParse = (req: Req): Record<string, Record<string, string>> => {
  if (req.url && req.reg) {
    let dPath;
    try {
      dPath = decodeURI(req.url.pathname); // if possible to decode
    } catch (_e) {
      dPath = req.url.pathname; // not possible to decode
    }

    // parse query
    const s = req.url.search.split("?")[1];
    const query: Record<string, string> = {};
    if (s) {
      const o = s.split("&");
      for (const p of o) {
        const l = p.split("=");
        try {
          query[l[0]] = l[1] ? decodeURI(l[1]) : "";
        } catch (_) {
          query[l[0]] = l[1] || "";
        }
      }
    }

    return { params: dPath.match(req.reg)?.groups || {}, query }; // return params and query
  }
  return { params: {}, query: {} };
};
