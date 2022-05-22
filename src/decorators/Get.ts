import { Method, RequestDecorator } from '.';

export const Get = (path: string): MethodDecorator => RequestDecorator(path, Method.get);
