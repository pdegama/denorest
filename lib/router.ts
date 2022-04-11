import path_parse from "./path_parse.ts";

class Router {

    public paths: any = {}
    public routes: any = [];
    public hands: any = [];

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
        this.paths[path] = hand;
    }

    public set404 = async (hand: Function) => {
        this.hand404 = hand;
    }

    public get = async () => {

        for (const k in this.paths) {
            this.routes.push(path_parse(k));
            this.hands.push(this.paths[k]);
        }

        this.routes.push("___404");
        this.hands.push(this.hand404);

        console.log(this.routes)

        return {
            routes: this.routes,
            hands: this.hands
        }

    }

    public pre = async (path: string, route: Router) => {
        for (const pathKey in route.paths) {
            this.paths[path + (pathKey !== "/" ? pathKey : "")] = route.paths[pathKey];
        }
    }

}

export default Router