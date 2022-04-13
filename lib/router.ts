import path_parse from "./path_parse.ts";

interface Routes {
    path: string,
    method: string,
    hand: Function
}

class Router {

    public routes: any = [];

    // default 404 status code handler
    public hand404: Function = async (req:any, res:any) => {
        res.reply = {
            status: 404,
            massage: "Route Not Found"
        }
        res.headers = {
            "Content-Type": "application/json"
        }
    };

    // for all req method
    public all = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'ALL', hand }
        this.routes.push(e);
    }

    // for ony GET method
    public get = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'GET', hand }
        this.routes.push(e);
    }

    // for ony POST method
    public post = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'POST', hand }
        this.routes.push(e);
    }

    // for ony PUT method
    public put = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'PUT', hand }
        this.routes.push(e);
    }

    // for ony DELETE method
    public delete = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'DELETE', hand }
        this.routes.push(e);
    }

    // for ony OPTIONS method
    public options = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'OPTIONS', hand }
        this.routes.push(e);
    }

    // for ony HEAD method
    public head = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'HEAD', hand }
        this.routes.push(e);
    }

    // for ony PATCH method
    public patch = async (path: string, hand: Function) => {
        let e: Routes = { path, method: 'PATCH', hand }
        this.routes.push(e);
    }

    public set404 = async (hand: Function) => {
        this.hand404 = hand;
    }

    public getRoutes = async () => {

        for (const r of this.routes) {
            r.path = path_parse(r.path)
        }

        this.routes.push({
            name: "___404",
            methods: "ALL",
            hand: this.hand404
        })

        return this.routes

    }

    // TODO: for to forof loop
    // add pre routes
    public pre = async (path: string, r: Router) => {

        for (let i = 0; i < r.routes.length; i++) {

            let e: Routes = {
                path: (path + (r.routes[i].path !== "/" ? r.routes[i].path : "")),
                method: r.routes[i].method,
                hand: r.routes[i].hand
            }

            this.routes.push(e);

        }
    }

}

export default Router