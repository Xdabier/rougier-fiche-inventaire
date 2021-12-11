export interface ServerInterface {
    url: string;
    port?: string | null;
    db: string;
    id?: number;
    username: string;
    password: string;
}
