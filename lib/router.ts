// Copyright 2022 Parthka. All rights reserved. MIT license.

import expParse from "./util/path_exp.ts";
import { Req, Res, Routes } from "./types.ts";

/** Use the Router class to create modular, mountable route handlers. */
class Router {
  public routes: Routes[] = []; // routes
  public hook: ((req: Req, res: Res) => void)[] = [];

  /** add hook */
  public use = async (hand: (req: Req, res: Res) => void) => {
    await this.hook.push(hand);
  };

  /** for all req method */
  public all = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "ALL",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only GET method */
  public get = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "GET",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only POST method */
  public post = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "POST",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only PUT method */
  public put = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "PUT",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only DELETE method */
  public delete = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "DELETE",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only OPTIONS method */
  public options = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "OPTIONS",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only HEAD method */
  public head = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "HEAD",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** for only PATCH method */
  public patch = (
    path: string,
    hand: (req: Req, res: Res) => void,
    hook: ((req: Req, res: Res) => void)[] = [],
  ) => {
    const e: Routes = {
      path,
      reg: / /,
      method: "PATCH",
      hand: [...this.hook, ...hook, hand],
    };
    this.routes.push(e);
  };

  /** get all routes in current router */
  public getRoutes = (m?: boolean) => {
    for (const r of this.routes) {
      r.reg = expParse(r.path, m);
    }
    return this.routes; // return all routes
  };

  /** add prefix routes */
  public pre = (path: string, r: Router) => {
    for (const rp of r.routes) {
      const e: Routes = {
        path: (path + (rp.path !== "/" ? rp.path : "")),
        reg: rp.reg,
        method: rp.method,
        hand: [...this.hook, ...rp.hand],
      };
      this.routes.push(e);
    }
  };
}

export default Router; // export router
