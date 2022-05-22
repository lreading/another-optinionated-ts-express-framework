import { Request } from 'express';
import { IUser } from '.';

export interface IAuthedRequest extends Request {
    user: IUser;
}
