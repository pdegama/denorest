/*!
 *
 * request url and path parser
 *
 */

import { Req } from "../types.ts";

export default (req: Req): Record<string, string> => {
  if (req.url && req.reg) {
    let dPath;
    try {
      dPath = decodeURI(req.url.pathname);
    } catch (_e) {
      dPath = req.url.pathname;
    }
    return dPath.match(req.reg)?.groups || {};
  }
  return {};
};
