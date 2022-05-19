# Denorest

![Denorest](https://raw.githubusercontent.com/slectgit/denorest-docs/master/denologo.png)

Lightweight, Minimalist Framework For REST API 🦕 🚀

```console
$ deno run https://raw.githubusercontent.com/slectgit/denorest/v2.0/example/hello.ts
```

```typescript
import { Req, Res, Router, WebApp } from "https://deno.land/x/denorest@v2.1/mod.ts";

const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = "Hello, Deno!";
});

app.set(router);
app.listen(8080);
```

## Features

- Support Javascript and TypeScript
- Robust routing
- Focus on high performance
- Content negotiation

## Documentation

[Website and Documentation](https://denorest.deno.dev/)

## Philosophy

The Denorest philosophy is to provide small, robust tooling for HTTP servers,
making it a great solution for HTTP APIs.

## Examples

#### TypeScript Example

```typescript
import { Req, Res, Router, WebApp } from "https://deno.land/x/denorest@v2.1/mod.ts";

const app = new WebApp();
const router = new Router();

router.get("/", (_req: Req, res: Res) => {
  res.reply = "Hello, TypeScript!";
});

app.set(router);
app.listen(8080);
```

#### JavaScript Example

```javascript
import { Router, WebApp } from "https://deno.land/x/denorest@v2.1/mod.js";

const app = new WebApp();
const router = new Router();

router.get("/", (_req, res) => {
  res.reply = "Hello, JavaScript!";
});

app.set(router);
app.listen(8080);
```

## People

The original author of Denorest is [Parthka](https://github.com/elparthka)

The current lead maintainer is [Slect Team](https://github.com/slectgit)

## License

[MIT](https://github.com/slectgit/denorest/blob/main/LICENSE)
