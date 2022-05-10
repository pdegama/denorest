# Denorest

![Denorest](https://raw.githubusercontent.com/slectgit/denorest-docs/main/denologo-1.png)

Deno lightweight framework for REST API

```console
$ deno run https://deno.land/std/examples/welcome.ts
```

```javascript
import { Router, WebApp } from "../mod.js";

const app = new WebApp();
const router = new Router();

router.get("/", (_eq, res) => {
  res.reply = "Hello, Deno!";
});

app.set(router);
app.listen(8080);
```

## Features

* Support Javascript and TypeScript
* Robust routing
* Focus on high performance
* Content negotiation

## Philosophy

The Denorest philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for HTTP APIs.

## Examples

#### JavaScript Example

```javascript
import { Router, WebApp } from "../mod.js";

const app = new WebApp();
const router = new Router();

router.get("/", (_eq, res) => {
  res.reply = "Hello, JavaScript!";
});

app.set(router);
app.listen(8080);
```

#### TypeScript Example
```typescript
import { Req, Res, Router, WebApp } from "../mod.ts";

const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = "Hello, TypeScript!";
});

app.set(router);
app.listen(8080);
```

## People

The original author of Denorest is [Parthka](https://github.com/elparthka)

The current lead maintainer is [Slect Team](https://github.com/slectgit)

## License

[MIT](https://github.com/slectgit/denorest/blob/main/LICENSE)