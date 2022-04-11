import path_parse from "./path_parse.ts";

interface Routes {
    path: string,
    method: string,
    hand: Function
}

class Router {

    public routes: any = [];

    public hand404: Function = async (req:any, res:any) => {
        res.reply = {
            status: 404,
            massage: "Route Not Found"
        }
        res.headers = {
            "Content-Type": "application/json"
        }
    };

    public all = async (path: string, hand: Function) => {
        let e: Routes = {
            path,
            method: 'ALL',
            hand
        }
        this.routes.push(e);
    }

    public set404 = async (hand: Function) => {
        this.hand404 = hand;
    }

    public get = async () => {


        return this.routes

    }

    public pre = async (path: string, r: Router) => {
        for (let i = 0; i < r.routes.length; i++) {

            let e: Routes = {
                path: (path + (r.routes[i].path !== "/" ? r.routes[i].path : "")),
                method: r.routes[i].method,
                hand: r.routes[i].hand
            }

            this.routes.push(e);

            console.log(path, r.routes)
        }
    }

}

export default Router