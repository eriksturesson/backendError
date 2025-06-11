export declare function httpErrorFormatter({ err, }: {
    err: unknown;
}): Promise<{
    status: number;
    body: Record<string, any>;
    showUser: boolean;
    message: string;
}>;
