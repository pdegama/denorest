import {Router} from "../mod.ts";

let v2 = new Router();

const profile = async (req:any, res: any) => {
    res.reply = "123"
}

v2.set("/", profile)

const profileRouter = new Router();

profileRouter.set("/", async (req:any, res:any) => {
    console.log(req.body.values('parthka'), req.method)
    res.reply = req.body.values('parthka')
})

profileRouter.set("/edit/username/:new_username/set", (req: any, res: any) => {
    res.status = 400
    res.headers = {
        "Content-Type": "text/html",
        "author": "Parthka"
    }
    res.reply = "<h1>This Is Edit Page</h1>"
})

profileRouter.set("/log", (req:any, res:any) => {
    res.reply = "<h1>Hello, World!"
    res.headers = {
        "Content-Type": "text/html"
    }
})

v2.pre("/:username", profileRouter)

export default v2