/*!
 *
 * add and get all routes, add prefix routes, using deffirent method (GET, POST, DELETE, PU...)
 *
 */

import path_parse from "./path_parse.ts";
import {Req, Res, Routes} from "./types.ts";

class Router {
  public routes: any = []; // routes

  // default 404 status code handler
  public hand404: unknown = async (req: any, res: any) => {
    res.reply = {
      status: 404,
      massage: "Route Not Found",
    };
    res.headers = {
      "Content-Type": "application/json",
    };
  };

  // default 500 status code handler
  public hand500: unknown = async (req: any, res: any) => {
    res.reply = {
      status: 500,
      massage: "Internal Server Error",
    };
    res.headers = {
      "Content-Type": "application/json",
    };
  };

  // for all req method
  public all = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "ALL", hand };
    this.routes.push(e);
  };

  // for only GET method
  public get = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "GET", hand };
    this.routes.push(e);
  };

  // for only POST method
  public post = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "POST", hand };
    this.routes.push(e);
  };

  // for only PUT method
  public put = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "PUT", hand };
    this.routes.push(e);
  };

  // for only DELETE method
  public delete = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "DELETE", hand };
    this.routes.push(e);
  };

  // for only OPTIONS method
  public options = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "OPTIONS", hand };
    this.routes.push(e);
  };

  // for only HEAD method
  public head = async (path: string, hand: unknown) => {
    const e: Routes = { path, method: "HEAD", hand };
    this.routes.push(e);
  };

  // for only PATCH method
  public patch = (path: string, hand: unknown) => {
    const e: Routes = { path, method: "PATCH", hand };
    this.routes.push(e);
  };

  // for 404 error
  public set404 = (hand: unknown) => {
    this.hand404 = hand;
  };

  // for 500 error
  public set500 = (hand: unknown) => {
    this.hand500 = hand;
  };

  // get all routes in current router
  public getRoutes = () => {
    for (const r of this.routes) {
      r.path = path_parse(r.path);
    }

    // add 404 error handler
    this.routes.push({
      name: "___404",
      methods: "ALL",
      hand: this.hand404,
    });

    // add 500 error handler
    this.routes.push({
      name: "___500",
      methods: "ALL",
      hand: this.hand500,
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

export type { Req, Res };
export default Router;
