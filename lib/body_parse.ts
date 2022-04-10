import { MultipartReader } from "https://deno.land/std/mime/mod.ts";

const getURL = async () => {

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
            console.log("formdata");
            return req.text();
        default:
            return req.text();
    }
}