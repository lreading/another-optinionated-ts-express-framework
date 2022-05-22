export interface IEntity<T> {
    id: T;
    getValidationErrors(): Promise<string | null>;
}
