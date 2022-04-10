import {Application, Router} from '../mod.ts';
import v2 from "./test_hand.ts";

let app = new Application(8888);
let mainRoute = new Router();
let secRout = new Router();
let v1API = new Router();

v1API.set("/user", async () => {

})

v1API.set("/login", async () => {

})

mainRoute.set("/", async (req: any, res: any) => {
    res.status = 200
    res.headers = {
        "Content-Type": "text/html",
        "Set-Cookie": "USER_TOKN=de87df",
        "X-Firefox-Spdy": "h2"
    }
    res.reply = `
        <html>
            <body>
                <form action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
            </body>
        </html>
    `
});

mainRoute.set("/helloworld", async (req: any, res: any) => {
    res.headers = {
        "Content-Type": "text/html",
        "Set-Cookie": "AUTHOR=parthka"
    }
    res.reply = req.headers.get('cookie')
});

secRout.pre("/v1", v1API)

secRout.pre("/v2", v2);

secRout.set("/v3", async () => {

})

mainRoute.pre("/api", secRout);

mainRoute.set404(async (req: any, res: any) => {
    res.headers = {
        "Content-Type": "text/html"
    }
    res.reply = "<h1>Opps, Page Not Found Bro</h1>"
})

app.set(mainRoute);

app.listen();
