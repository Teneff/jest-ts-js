export default abstract class GenericService<Type> {
    private readonly modifiedUrl: URL;

    public constructor(url: string) {
        this.modifiedUrl = new URL(url, window.location.href);
    }

    public async get(path?: string, filter?: URLSearchParams): Promise<Type> {
        try {
            if (path) {
                this.modifiedUrl.href += `${path}`;
            }
            // addQueryParams(this.modifiedUrl, filter);

            const response = await handleRequest(`${this.modifiedUrl}`, {
                method: "GET"
            });
            return response.json();
        } catch (error) {
            throw new Error(`Runtime error: ${error}`);
        }
    }
}

export async function handleRequest(input: RequestInfo, init: RequestInit): Promise<Response> {
    const response = await fetch(input, init);

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response}`);
    }

    return response;
}

