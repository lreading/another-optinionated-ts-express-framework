# another-optinionated-ts-express-framework
Just another opinionated TypeScript / Express Framework

## TODO:
- Document overall usage better
- Document expanding classes
- Document Entity structure
- Document Services
- Document Controllers
- Document Secrets

```typescript
import { getLogger } from '@lreading/typescript-winston-logger';
import express, { Express } from 'express';
import { AllowAnonymous, Controller, ExpressErrorHandler, Get, registerControllers } from '@lreading/another-ts-express-framework';
import http from 'http';


@Controller('/api/unauth')
class UnauthController {
    @Get('/')
    @AllowAnonymous()
    get() {
        return ['foo', 'bar', 'baz'];
    }
}


class Server {
    app: Express;
    server: http.Server;

    constructor() {
        this.app = express();

        const handler = new ExpressErrorHandler();

        registerControllers(this.app, getLogger('test.ts'), [
            UnauthController
        ]);

        this.app.use(handler.notFound.bind(handler));
        this.app.use(handler.catchAll.bind(handler));
    }

    async start() {
        return this.app.listen(3000, () => {
            console.log(`Server started on http://localhost:3000/`);
        });
    }
}

(async () => {
    const server = new Server();
    await server.start();
})();
```