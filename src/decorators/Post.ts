import { Method, RequestDecorator } from '.';

export const Post = (path: string): MethodDecorator => RequestDecorator(path, Method.post);
