/*!
 *
 * request body parser
 * support
 *    application/json
 *    multipart/form-data
 *    application/x-www-form-urlencoded
 *
 */

import {
  MultipartFormData,
  MultipartReader,
} from "https://deno.land/std@0.136.0/mime/mod.ts";
import { StringReader } from "https://deno.land/std@0.136.0/io/readers.ts";

// TODO
const getURL = (req: any, b: string[]): string => {
  return req.body;
};

// TODO
const getJSON = (req: any, b: string[]): string => {
  return req.body;
};

// TODO
const getForm = async (req: any, b: string[]): Promise<MultipartFormData> => {
  if (b[1]) {
    const sr = new StringReader(req.body);
    const mr = new MultipartReader(sr, b[1].split("=")[1]);
    return await mr.readForm(20 << 20);
  } else {
    return req.body;
  }
};

// return parsed data
export default async (req: any): Promise<MultipartFormData | string | any> => {
  if (req.body) {
    const reqType = String(req.headers.get("content-type")).split("; ");
    switch (reqType[0]) {
      case "application/json":
        return getJSON(req, reqType); // if content-type is application/json
      case "multipart/form-data":
        return await getForm(req, reqType); // if content-type is multipart/form-data
      case "application/x-www-form-urlencoded":
        return getURL(req, reqType); // if content-type is x-www-form-urlencoded
      default:
        return req.text();
    }
  }
};
