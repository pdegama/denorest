/*!
 *
 * server make and listen
 *
 */

import { serve } from "https://deno.land/std@0.136.0/http/server.ts";
import Router from "./router.ts";
import { Req, Res, Routes } from "./types.ts";

class Server {
  private port: number; // default Port
  private hand404 = (_1: Req, _2: Res) => {}; // 404 route handler
  private hand500 = (_1: Req, _2: Res) => {}; // 500 route handler
  public routes: Routes[] = []; // all routes
  private dHeaders: Record<string, string> = {};

  // port configure
  constructor(port: number = 8080) {
    this.port = port;
  }

  /* Set default headers */
  public headers = (headers: Record<string, string>) => this.dHeaders = headers;
  
  // set routes
  public set = async (r: Router) => {
    this.routes = await r.getRoutes(); // set all routes
    this.hand404 = await this.routes[this.routes.length - 2].hand; // set 404 routes
    this.hand500 = await this.routes[this.routes.length - 1].hand; // set 500 routes
  };

  //main handler
  private hand = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    let is404 = true;

    const res: Res = {
      reply: "",
      headers: {},
      status: 200,
    };

    const r: Req = {};

    // check all routes to client path
    for (const ele of this.routes) {
      if (
        url.pathname.match(ele.reg) &&
        (ele.method === req.method || ele.method === "ALL")
      ) {
        is404 = false; // if path found than not call 404

        if (req.body) {
          r.body = await req.text(); // get client body
        }

        r.headers = req.headers; // set headers
        r.method = req.method; // set methos
        r.url = req.url; // ser url

        try {
          await ele.hand(r, res); // call route handler
        } catch (_e) {
          await this.hand500(r, res); // if Errors than call 500 route
        }
        break;
      }
    }

    // if page not found than
    if (is404) {
      if (req.body) {
        r.body = await req.text();
      }
      r.headers = req.headers;
      r.method = req.method;
      r.url = req.url;
      try {
        await this.hand404(r, res);
      } catch (_e) {
        await this.hand500(r, res);
      }
    }

    // send client response
    return new Response(
      typeof res.reply === "object" ? JSON.stringify(res.reply) : res.reply,
      {
        status: res.status, // set status code
        headers: {...this.dHeaders, ...res.headers}, // set default and specific handler headers
      },
    );
  };

  // listen server
  listen = () => {
    serve(this.hand, { port: this.port });
  };
}

export default Server; // export server
