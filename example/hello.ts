import {
  Req,
  Res,
  Router,
  WebApp,
} from "https://deno.land/x/denorest@v4.2/mod.ts";

const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = "Hello, Deno!";
});

app.set(router);
app.listen(8080);
