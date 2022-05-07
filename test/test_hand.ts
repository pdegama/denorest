import { bodyParse, Req, Res, Router } from "../mod.ts";

let v2 = new Router();

const profile = async (req: Req, res: Res) => {
  res.reply = "123";
  res.headers = {
    'Content-type': "text/html"
  }
};

v2.all("/", profile);

const profileRouter = new Router();

profileRouter.all("/", async (req: Req, res: Res) => {
  res.reply = "123xyz";
});

profileRouter.all(
  "/edit/username/:new_username/set",
  async (req: Req, res: Res) => {
    res.status = 400;
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
  let body = await bodyParse(req);
  console.log(body.values("123"));
  res.reply = {
    m: "POST",
    fname: body.values("f_name"),
    add: body.values("address"),
  };
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
    "stamp": Date().toLocaleLowerCase()
  };
});

v2.pre("/:username", profileRouter);

export default v2;
