import { Req, Res, Router, WebApp } from "../mod.ts";

const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = "Hello, TypeScript!";
});

app.set(router);
app.listen(8080);
