/*!
 *
 * add and get all routes, add prefix routes, using deffirent method (GET, POST, DELETE, PU...)
 *
 */

import path_parse from "./path_parse.ts";
import {Req, Res, Routes} from "./types.ts";

class Router {
  public routes: Routes[] = []; // routes

  // default 404 status code handler
  public hand404 = (_: Req, res: Res): void => {
    res.reply = {
      status: 404,
      massage: "Route Not Found",
    };
    res.headers = {
      "Content-Type": "application/json",
    };
  };

  // default 500 status code handler
  public hand500 = (_: Req, res: Res): void => {
    res.reply = {
      status: 500,
      massage: "Internal Server Error",
    };
    res.headers = {
      "Content-Type": "application/json",
    };
  };

  // for all req method
  public all = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "ALL", hand };
    this.routes.push(e);
  };

  // for only GET method
  public get = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "GET", hand };
    this.routes.push(e);
  };

  // for only POST method
  public post = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "POST", hand };
    this.routes.push(e);
  };

  // for only PUT method
  public put = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "PUT", hand };
    this.routes.push(e);
  };

  // for only DELETE method
  public delete = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "DELETE", hand };
    this.routes.push(e);
  };

  // for only OPTIONS method
  public options = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "OPTIONS", hand };
    this.routes.push(e);
  };

  // for only HEAD method
  public head = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "HEAD", hand };
    this.routes.push(e);
  };

  // for only PATCH method
  public patch = (path: string, hand: (req: Req, res: Res) => void) => {
    const e: Routes = { path, reg: / /, method: "PATCH", hand };
    this.routes.push(e);
  };

  // for 404 error
  public set404 = (hand: (req: Req, res: Res) => void) => {
    this.hand404 = hand;
  };

  // for 500 error
  public set500 = (hand: (req: Req, res: Res) => void) => {
    this.hand500 = hand;
  };

  // get all routes in current router
  public getRoutes = () => {
    for (const r of this.routes) {
      r.reg = path_parse(r.path);
    }

    // add 404 error handler
    this.routes.push({
      path: "___404",
      method: "ALL",
      hand: this.hand404,
      reg: /^___404$/,
    });

    // add 500 error handler
    this.routes.push({
      path: "",
      method: "ALL",
      hand: this.hand500,
      reg: /^___500$/,
    });

    return this.routes; // return all routes
  };

  // add prefix routes
  public pre = (path: string, r: Router) => {
    for (const rp of r.routes) {
      const e: Routes = {
        path: (path + (rp.path !== "/" ? rp.path : "")),
        reg: rp.reg,
        method: rp.method,
        hand: rp.hand,
      };
      this.routes.push(e);
    }
  };
}

export default Router;
