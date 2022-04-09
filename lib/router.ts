class Router {

    public paths:any = {};

    public set = async (path: string, hand: Function) => {
        this.paths[path] = hand;
    }

    public get = async () => {
        for (const k in this.paths) {
            console.log(k)
        }
    }

    public pre = async (path:string, route: Router) => {
        for (const pathKey in route.paths) {
            this.paths[path+pathKey] = route.paths[pathKey];
        }
    }

}

export default Router