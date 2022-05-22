import { Method, RequestDecorator } from '.';

export const Put = (path: string): MethodDecorator => RequestDecorator(path, Method.put);
