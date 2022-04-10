import {Application, Router} from '../mod.ts';
import v2 from "./test_hand.ts";

let app = new Application(8002);
let mainRoute = new Router();
let secRout = new Router();
let v1API = new Router();

v1API.set("/user", async () => {

})

    v1API.set("/login", async () => {

})

mainRoute.set("/", async () => {

});

mainRoute.set("/helloworld", async () => {

});

secRout.pre("/v1",v1API)

secRout.pre("/v2", v2);

secRout.set("/v3", async () => {

})

mainRoute.pre("/api", secRout);

//mainRoute.get();

app.set(mainRoute);

app.listen();


