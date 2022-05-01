/*
 *
 * server make and listen
 *
 */

import { serve } from "https://deno.land/std@0.136.0/http/server.ts";
import Router from "./router.ts";

export default class {
  private port: number = 8080; // default Port
  private hand404: any; // 404 route handler
  private hand500: any; // 500 route handler
  public routes: any = {}; // all routes

  // port configure
  constructor(port: number = 8080) {
    this.port = port;
  }

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

    let res: any = {
      reply: "",
      headers: {},
      status: 200,
    };

    let r: any = {};

    // check all routes to client path
    for (const ele of this.routes) {
      if (
        url.pathname.match(ele.path) &&
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
        } catch (e) {
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
      } catch (e) {
        await this.hand500(r, res);
      }
    }

    // send client response
    return new Response(
      typeof res.reply === "object" ? JSON.stringify(res.reply) : res.reply,
      {
        status: res.status,
        headers: res.headers,
      },
    );
  };

  // listen server
  listen = async () => {
    serve(this.hand, { port: this.port }).then((_) => {
      console.log("Server Start!");
    });
  };
}
