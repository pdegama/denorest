import { MultipartReader } from "https://deno.land/std/mime/mod.ts";
import { StringReader } from "https://deno.land/std/io/readers.ts";

const getURL = async (req: any, b: string[]) => {
  return req.body;
};

const getJSON = async (req: any, b: string[]) => {
  return req.body;
};

const getForm = async (req: any, b: string[]): Promise<any> => {
  if (b[1]) {
    const sr = new StringReader(req.body);
    const mr = new MultipartReader(sr, b[1].split("=")[1]);
    return await mr.readForm(10240);
  } else {
    return req.body;
  }
};

export default async (req: any): Promise<any> => {
  if (req.body) {
    let reqType = String(req.headers.get("content-type")).split("; ");
    switch (reqType[0]) {
      case "application/json":
        return await getJSON(req, reqType);
      case "application/x-www-form-urlencoded":
        return await getURL(req, reqType);
      case "multipart/form-data":
        return await getForm(req, reqType);
      default:
        return req.text();
    }
  } else {
    return "No Boy";
  }
};
