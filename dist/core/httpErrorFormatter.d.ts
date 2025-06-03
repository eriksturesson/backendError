export declare function httpErrorFormatter({ err }: {
    err: unknown;
}): Promise<{
    status: number;
    body: string;
}>;
