import * as request from "../src/request"

const url = "http://localhost:3030"

export function readPosts() {
    return request.get(`${url}/posts`)
}