import {serve} from "https://deno.land/std@0.134.0/http/server.ts";

serve(handler, {port: 8000}).then(_ => {
    console.log("Server Start!")
});

async function handler(req: Request): Promise<Response> {
    //console.log("Method:", req.method);

    const url = new URL(req.url);
    //console.log("Path:", url.pathname);
    //console.log("Query parameters:", url.searchParams);

    //console.log("Headers:", req.headers);

    if (req.body) {
        const body = await req.text();
        //console.log("Body:", body);
    }

    return new Response("Hello, Deno!");
}