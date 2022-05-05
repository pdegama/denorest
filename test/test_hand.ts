import { bodyParse, Router } from "../mod.ts";

let v2 = new Router();

const profile = async (req: any, res: any) => {
  res.reply = "123";
};

v2.all("/", profile);

const profileRouter = new Router();

profileRouter.all("/", async (req: any, res: any) => {
  res.reply = "123xyz";
});

profileRouter.all("/edit/username/:new_username/set", (req: any, res: any) => {
  res.status = 400;
  res.headers = {
    "Content-Type": "text/html",
    "author": "Parthka",
  };
  res.reply = "<h1>This Is Edit Page</h1>";
});

const logGET = async (req: any, res: any) => {
  res.reply = '["<h1>Hello, World!"]';
  res.headers = {
    "Content-Type": "text/html",
    author: "parthka" 
  };
}

profileRouter.get("/log", logGET);

profileRouter.post("/log", async (req: any, res: any) => {
  let body = await bodyParse(req);
  console.log(body.values("123"));
  res.reply = {
    m: "POST",
    fname: body.values("f_name"),
    add: body.values("address")
  };
  res.headers = {
    "Content-Type": "text/html",
  };
});

profileRouter.all("/log", (req: any, res: any) => {
  res.reply = {
    m: "Other",
  };
  res.headers = {
    "Content-Type": "text/html",
  };
});

profileRouter.delete("/delete", (req: any, res: any) => {
  res.reply = "<h1>Hello, World!";
  res.headers = {
    "Content-Type": "text/html",
  };
});

v2.pre("/:username", profileRouter);

export default v2;
