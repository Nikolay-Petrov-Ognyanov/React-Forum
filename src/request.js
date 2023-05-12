async function requester(method, url, data) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {}

    if (accessToken) {
        headers["X-Authorization"] = accessToken
    }

    function makeRequest(method, url, data) {
        if (method === "GET" || method === "DELETE") {
            return fetch(url)
        } else {
            return fetch(url, method, {
                headers,
                data
            })
        }
    }

    try {
        const response = await makeRequest(method, url, data)
        const result = await response.json()
        
        return result
    } catch (error) {
        console.error(error)
    }
}

export function get(url) {
    return requester("GET", url)
}

export function post(url, data) {
    return requester("POST", url, data)
}

export function put(url, data) {
    return requester("PUT", url, data)
}

export function del(url) {
    return requester("DELETE", url)
}