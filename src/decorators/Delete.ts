import { Method, RequestDecorator } from '.';

export const Delete = (path: string): MethodDecorator => RequestDecorator(path, Method.delete);
