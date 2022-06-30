// Copyright 2022 Parthka. All rights reserved. MIT license.

import { serve, serveTls } from "https://deno.land/std@0.140.0/http/server.ts";
import Router from "./router.ts";
import { Req, Res, Routes } from "./types.ts";

/** A class which registers router. */
class Server {
  public routes: Routes[] = []; // all routes
  private dHeaders: Record<string, string> = {}; // default headers
  private allowME = false; // more Exp var

  /** default 404 status code handler */
  private hand404 = (_: Req, res: Res): void => {
    res.reply = JSON.stringify({
      status: 404,
      massage: "Route Not Found",
    });
    res.headers = {
      "Content-Type": "application/json",
    };
  };
  
  /** default 500 status code handler */
  private hand500 = (_: Req, res: Res): void => {
    res.reply = JSON.stringify({
      status: 500,
      massage: "Internal Server Error",
    });
    res.headers = {
      "Content-Type": "application/json",
    };
  };
  
  /** Set default headers */
  public headers = (headers: Record<string, string>) => this.dHeaders = headers;
  
  /** set more path Exp */
  public allowMoreExp = (allow: boolean) => this.allowME = allow;

  /** set routes */
  public set = async (r: Router) => {
    this.routes = await r.getRoutes(this.allowME); // set all routes
  };

  /** set 404 error handler */
  public set404 = (hand: (req: Req, res: Res) => void) => {
    this.hand404 = hand;
  };

  /** set 500 error handler */
  public set500 = (hand: (req: Req, res: Res) => void) => {
    this.hand500 = hand;
  };

  /** main handler */
  private hand = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    let is404 = true;

    const res: Res = {
      reply: "",
      headers: {},
      status: 200,
    };

    const r: Req = { state: {} };

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
        r.url = url; // set url
        r.reg = ele.reg; // set reg exp

        try {
          for (const h of ele.hand) {
            await h(r, res); // calls route handler
            if (await res.reply !== "") {
              break;
            }
          }
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
      r.url = url;
      try {
        await this.hand404(r, res);
      } catch (_e) {
        await this.hand500(r, res);
      }
    }

    // send client response */
    return new Response(
      res.reply,
      {
        status: res.status, // set status code
        headers: { ...this.dHeaders, ...res.headers }, // set default and specific handler headers
      },
    );
  };

  /** listen server */
  public listen = (port: number) => {
    serve(this.hand, {
      port: port, // ser port
    });
  };

  /** listen server on TLS */
  public listenTls = (port: number, certFile: string, keyFile: string) => {
    serveTls(this.hand, {
      port: port, // set port
      certFile, // set cert file
      keyFile, // set key file
    });
  };
}

export default Server; // export server
