---
layout: default
---

## REST Controllers

### TLDR;

1. Create your controller
2. Register your controller

Example:
```typescript
import { Controller, Get, Post } from '@lreading/another-ts-express-framework';

@Controller('/api/v1/foo')
export class FooController {

    // GET http://myawesomesite.com/api/v1/foo
    //
    // RES: { status: 200, data: 'foo'}
    @Get('/')
    get() {
        return 'foo';
    }
}

```

### Creating REST Endpoints
Rest controllers are easily added using the following _class_ decorators:
- `@Controller('/route/to/resource')`

The classes can implement different HTTP verbs:
- `@Get('/')`
- `@Post('/extra/path/data')`
- `@Put('/can/also/use/:params')`
- `@Delete('/')`



### TODO
- Document all decorators (include url params)
- Document base implementations and how to extend them
- Document responses / types
- Document catchall handler
- Document 404 handler
- Document services
- Document entities

[back](./)
