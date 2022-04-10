import path_parse from "./path_parse.ts";

class Router {

    public paths: any = {};
    public routes: any = [];
    public hands: any = [];

    public set = async (path: string, hand: Function) => {
        this.paths[path] = hand;
    }

    public get = async () => {

        for (const k in this.paths) {
            this.routes.push(path_parse(k));
            this.hands.push(this.paths[k]);
        }

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