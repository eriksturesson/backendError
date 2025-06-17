export declare function httpErrorFormatter(err: unknown): {
    status: number;
    body: Record<string, any>;
    showUser: boolean;
    message: string;
};
