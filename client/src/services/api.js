const baseUrl = "http://localhost:3030";

export async function request(method, url, data, token) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    if (token) {
        options.headers["X-Authorization"] = token;
    }

    const response = await fetch(baseUrl + url, options);

    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (_) { }

        throw new Error(errorData.message || `Error: ${response.status}`);
    }

    try {
        return await response.json();
    } catch {
        return {};
    }
}

export function get(url, token) {
    return request("GET", url, undefined, token);
}

export function post(url, data, token) {
    return request("POST", url, data, token);
}

export function put(url, data, token) {
    return request("PUT", url, data, token);
}

export function del(url, token) {
    return request("DELETE", url, undefined, token);
}
