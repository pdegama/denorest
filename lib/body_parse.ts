import {MultipartReader} from "https://deno.land/std/mime/mod.ts";
import {StringReader} from "https://deno.land/std/io/readers.ts"

const getURL = async () => {

}

const getForm = async (req: Request, b: string[]): Promise<any> => {
    let body = await req.text();
    if (b[1]){
        const sr = new StringReader(body);
        const mr = new MultipartReader(sr, b[1].split("=")[1]);
        return await mr.readForm(10240);
    } else {
        return body;
    }
}

export default async (req: Request): Promise<any> => {
    let reqType = String(req.headers.get("content-type")).split("; ");
    switch (reqType[0]) {
        case "application/json":
            console.log("jaondata");
            return req.text();
        case "application/x-www-form-urlencoded":
            console.log("urldata");
            return req.text();
        case "multipart/form-data":
            return await getForm(req, reqType);
        default:
            return req.text();
    }
}