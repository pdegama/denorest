import { serve } from "https://deno.land/std/http/server.ts";
import Router from "./router.ts";
import body_parse from "./body_parse.ts";

export default class {

    private port:number = 8080;
    private hand404:any;
    public routes:any = {};

    constructor(port:number = 8000){
        this.port = port;
    }

    public set = async (r:Router) => {
        this.routes = await r.getRoutes();
        this.hand404 = await this.routes[this.routes.length - 1].hand;
    }

    //main handler
    private hand = async (req: Request): Promise<Response> => {

        const url = new URL(req.url);

        let is404 = true;
        let body = "";

        let res:any = {
            reply: "",
            headers: {},
            status: 200
        }

        let r:any = {}

        for (const ele of this.routes) {
            if (url.pathname.match(ele.path) && (ele.method === req.method || ele.method === 'ALL')){
                is404 = false;
                if (req.body) {
                    body = await body_parse(req);
                }
                r.headers = req.headers;
                r.method = req.method;
                r.url = req.url;
                r.body = body;
                await ele.hand(r, res);
                break;
            }
        }

        if(is404){
            if (req.body) {
                body = await body_parse(req);
            }
            r.headers = req.headers;
            r.method = req.method;
            r.url = req.url;
            r.body = body;
            await this.hand404(r, res);
        }

        return new Response(typeof res.reply === "object" ? JSON.stringify(res.reply) : res.reply,{
            status: res.status,
            headers: res.headers
        });

    }

    //listen server
    listen = async () => {
        serve(this.hand, {port: this.port}).then(_ => {
            console.log("Server Start!");
        });
    }

}
