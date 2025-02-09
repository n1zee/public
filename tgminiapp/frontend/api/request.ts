import Cookie from 'js-cookie';

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiBasePath = `${apiBaseUrl}/api/twa`;
const isDev = process.env.NODE_ENV === 'development';

interface RequestParams {
    path: string;
    queryParams?: Record<string, unknown>;
}

interface PostRequestParams extends RequestParams {
    body?: Record<string, unknown>;
}

interface GetRequestParams extends RequestParams {
    queryParams?: Record<string, unknown>;
}

export const generateQueryParamsString = (queryParams?: Record<string, unknown>): string => {
    if (!queryParams) return '';

    const urlSearchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach((v) => {
                    const intValue = parseInt(v as string, 10);
                    if (!isNaN(intValue)) {
                        urlSearchParams.append(key, intValue.toString());
                    }
                });
            } else {
                urlSearchParams.append(key, String(value));
            }
        }
    });

    return urlSearchParams.toString() ? `?${urlSearchParams.toString()}` : '';
};

const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const accessToken = isDev ? process.env.NEXT_PUBLIC_AUTH_TOKEN : Cookie.get('auth');
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
};

export const createPostRequest = async <T>({ path, body }: PostRequestParams): Promise<T> => {
    try {
        const response = await fetch(`${apiBasePath}/${path}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });

        return await response.json();
    } catch (e) {
        console.error('Post request error:', e);
        throw e;
    }
};

export const createGetRequest = async <T>({ path, queryParams }: GetRequestParams): Promise<T> => {
    try {
        const response = await fetch(`${apiBasePath}/${path}${generateQueryParamsString(queryParams)}`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            const error = new Error(errorDetails.message || 'Request failed');
            (error as any).status = response.status;
            throw error;
        }

        return await response.json();
    } catch (e) {
        console.error('Get request error:', e);
        throw e;
    }
};