async function requester(url, method, data) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {}

    if (accessToken) { headers["X-Authorization"] = accessToken }

    function sendRequest(url, method, data) {
        if (method === "GET") {
            return fetch(url)
        } else {
            return fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    }

    try {
        const response = await sendRequest(url, method, data)
        const result = response.status !== 204 && await response.json()

        return result && result
    } catch (error) { console.error(error) }
}

export function get(url) { return requester(url, "GET") }

export function post(url, data) { return requester(url, "POST", data) }

export function put(url, data) { return requester(url, "PUT", data) }

export function del(url) {


    return requester(url, "DELETE")
}