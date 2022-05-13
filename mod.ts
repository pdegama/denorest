/*!
 *
 * Denorest
 * Copyright (c) 2022 Parthka <elparthka.2005@gmail.com>
 * MIT Licensed
 *
 */

import WebApp from "./lib/server.ts";
import Router from "./lib/router.ts";
import bodyParse from "./lib/util/body_parse.ts";
import pathParse from "./lib/util/path_parse.ts";
import { Req, Res } from "./lib/types.ts";

export type { Req, Res };
export { bodyParse, pathParse, Router, WebApp };
