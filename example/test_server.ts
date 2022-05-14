import { bodyParse, pathParse, Req, Res, Router, WebApp } from "../mod.ts";
import v2 from "./test_hand.ts";

let PORT: number = 8888;
let sysPORT = Deno.env.get("PORT");

if (sysPORT !== undefined) {
  PORT = parseInt(sysPORT);
}

let app = new WebApp();
app.allowMoreExp(true);

app.headers({
  "Content-Type": "application/json",
  author: "pka",
  "x-powered-by": "DenoFS/Denorest",
  "Set-Cookie": "LESTTIME=" + Date(),
});
let mainRoute = new Router();
let secRout = new Router();
let v1API = new Router();

v1API.all("/user", async (req: any, res: any) => {
  res.reply = "hello, world";
});

v1API.all("/login", async () => {
});


mainRoute.use((req: Req, res: Res) => {
  req.state.token = "ad8adkmdw"
  //console.log(`path: ${req.url?.pathname} time: ${Date()}`);
});

await mainRoute.get("/", async (req: any, res: any) => {
  /* console.log(pathParse(req)); */
  /* user.insertOne({
    username: "parthka",
    password: "123"
  }) */
  res.reply = "pathParse(req)";
  res.headers = {
    "Content-Type": "text/html",
  };
});

mainRoute.get("/123", async (req: any, res: any) => {
  res.status = 200;
  res.headers = {
    "Content-Type": "text/html",
    "Set-Cookie": "USER_TOKN=de87df",
  };
  res.reply = `
        <html>
            <body>
                <form action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
                <form enctype="multipart/form-data" action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
            </body>
        </html>
    `;
});

mainRoute.all("/123", async (req: any, res: any) => {
  res.reply = "Hello, World! 123";
});

mainRoute.post("/", async (req: any, res: any) => {
  let p = await bodyParse(req);
  console.log(p.text);
  res.status = 200;
  res.headers = {
    "Content-Type": "text/html",
    "Set-Cookie": "USER_TOKN=de87df",
    "X-Firefox-Spdy": "h2",
  };
  res.reply = p;
});

mainRoute.all("/helloworld", async (req: any, res: any) => {
  res.headers = {
    "Content-Type": "text/html",
    "Set-Cookie": "AUTHOR=parthka",
  };
  let s = await bodyParse(req);
  res.reply = `${s.values("f_name")[0]}`;
});

secRout.all("/", (req: Req, res: Res) => {
  res.reply = "Hello, World";
});

secRout.pre("/v1", v1API);

secRout.pre("/v2", v2);

secRout.all("/v3", async () => {
});

mainRoute.all("/apix", (req: Req, res: Res) => {
  console.log("apix");
});
mainRoute.pre("/:api", secRout);

app.set(mainRoute);

app.listen(PORT);

app.set404(async (req: any, res: any) => {
  res.status = 404;
  res.headers = {
    "Content-Type": "text/html",
  };
  res.reply = "hello, I Am 404!";
});

app.set500(async (req: any, res: any) => {
  res.headers = {
    "Content-Type": "application/json",
  };
  res.reply = { error: "Request error" };
});
