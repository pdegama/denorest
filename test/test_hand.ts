import { bodyParse, pathParse, Req, Res, Router } from "../mod.ts";
import {
  Bson,
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.29.4/mod.ts";

const client = new MongoClient();
await client.connect("mongodb://localhost:27017");
const db = client.database("denorest");
interface UserSchema {
  _id: ObjectId;
  forward: string;
  username: string;
  name: String;
}
const users = db.collection<UserSchema>("users");

let v2 = new Router();

const profile = async (req: Req, res: Res) => {
  res.reply = "123";
  res.headers = {
    "Content-type": "text/html",
  };
};

v2.all("/", profile);

const profileRouter = new Router();

profileRouter.all("/", async (req: Req, res: Res) => {
  res.reply = "123xyz";
});

profileRouter.all(
  "/edit/username/:new_username/set",
  async (req: Req, res: Res) => {
    console.log(pathParse(req));
    res.status = 200;
    res.headers = {
      "Content-Type": "text/html",
      "author": "Parthka",
    };
    res.reply = "<h1>This Is Edit Page</h1>";
  },
);

const logGET = async (req: Req, res: Res) => {
  res.reply = `hello, <b>world</b>`;
  res.headers = {
    "Content-Type": "application/json",
    author: "parthka",
  };
};

profileRouter.get("/log", logGET);

profileRouter.post("/log", async (req: Req, res: Res) => {
  const p = pathParse(req);
  let body = await bodyParse(req);
  console.log(body.values("123"));
  const f = users.find({
  username: p.params.username 
  })

  res.reply = JSON.stringify(await f.toArray());;
  res.headers = {
    "Content-Type": "text/html",
  };
});

profileRouter.all("/log", async (req: Req, res: Res) => {
  res.reply = {
    m: "Other",
  };
  res.headers = {
    "Content-Type": "text/html",
  };
});

profileRouter.all("/delete", async (req: Req, res: Res) => {
  res.reply = "[123]";
  res.headers = {
    "Content-Type": "text/html",
    "stamp": Date().toLocaleLowerCase(),
  };
});

v2.pre("/:username", profileRouter);

export default v2;
