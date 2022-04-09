import {Router} from "./mod.ts";

let v2 = new Router();

const profile = async () => {

}

v2.set("/", profile)

const profileRouter = new Router();

profileRouter.set("/", () => {

})

profileRouter.set("/edit", () => {

})

profileRouter.set("/log", () => {

})

v2.pre("/profile", profileRouter)

export default v2