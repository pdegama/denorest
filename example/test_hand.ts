import { bodyParse, pathParse, Req, Res, Router } from "../mod.ts";

interface UserSchema {
  forward: string;
  username: string;
  name: String;
}

let v2 = new Router();

const profile = async (req: Req, res: Res) => {
  res.reply = "123";
  res.headers = {
    "Content-type": "text/html",
  };
};

v2.all("/", profile);

const profileRouter = new Router();
const userAuth = (req: Req, res: Res) => [];
const queryPrint = (req: Req, res: Res) => {
  const body = pathParse(req);
  if (body.params.query !== "unlock") {
    res.reply = "Opps, I Am Busy!"
  }
};

profileRouter.use(userAuth);

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
  console.log(body.value("123"));

  res.reply = JSON.stringify({});
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

const otherRouter = new Router();

otherRouter.use(async (req: Req, res: Res) => {
  res.headers = {
    "Content-Type": "text/html"
  }
  if(pathParse(req).params.username === "parthka"){
    req.state.auth = true;
  }else{
    req.state.auth = false;
  }
});

otherRouter.all("/", (req: Req, res: Res) => {
  console.log(req.state);
  
  res.headers = {
    ... res.headers,
    "author": "parthka"
  }
  res.reply = "<h1>Hello, On Query Page!</h1>"
});

otherRouter.all("/:query", (req: Req, res: Res) => {
  res.reply = "Hello, Your Query?"
}, [queryPrint, userAuth]);

profileRouter.pre("/other", otherRouter);

profileRouter.all("/delete", async (req: Req, res: Res) => {
  res.reply = "[123]";
  res.headers = {
    "Content-Type": "text/html",
    "stamp": Date().toLocaleLowerCase(),
  };
});

v2.pre("/:username", profileRouter);

export default v2;
