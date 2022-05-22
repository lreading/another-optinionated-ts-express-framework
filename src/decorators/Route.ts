import { Request, Response } from 'express';

import { Method } from '.';

export interface Route {
    path: string;
    method: Method;
    implementation: (req: Request, res: Response, instance: any) => any;
    allowAnonymous: boolean;
}
