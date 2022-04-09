import { serve } from "https://deno.land/std@0.134.0/http/server.ts";
import Router from "./router.ts";

export default class {

    private port:number = 8080;
    public routes:any = {};

    constructor(port:number = 8000){
        this.port = port;
    }

    public set = async (r:Router) => {
        this.routes = r.paths;
    }

    //main handler
    private hand = async (req: Request): Promise<Response> => {

        const url = new URL(req.url);

        for (const rKey in this.routes) {
            if(rKey === url.pathname){
                //console.log("yes")
                break;
            }
        }

        if (req.body) {
            const body = await req.text();
        }

        return new Response("Hello, World!");
    }

    //listen server
    public listen = async () => {
        serve(this.hand, {port: this.port}).then(_ => {
            console.log("Server Start!")
        });
    }

}