import { serve } from "https://deno.land/std/http/server.ts";
import Router from "./router.ts";

export default class {

    private port:number = 8080;
    public paths:any = {};

    constructor(port:number = 8000){
        this.port = port;
    }

    public set = async (r:Router) => {
        this.paths = await r.get();
        //console.log(this.paths);
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

        for (let i = 0; i < this.paths.routes.length; i++) {
            if (url.pathname.match(this.paths.routes[i])){
                is404 = false;
                if (req.body) {
                    body = await req.text();
                }
                r.headers = req.headers;
                r.method = req.method;
                r.url = req.url;
                r.body = body;
                await this.paths.hands[i](r, res);
                break;
            }
        }

        if(is404){
            if (req.body) {
                body = await req.text();
            }
            r.headers = req.headers;
            r.method = req.method;
            r.url = req.url;
            r.body = body;
            await this.paths.hands[this.paths.routes.length -1](r, res);
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
