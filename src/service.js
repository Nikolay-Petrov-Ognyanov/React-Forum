import * as request from "../src/request"

const url = "http://localhost:3030"

export function readPosts() {
    return request.get(`${url}/posts`)
}

export function readUsers() {
    return request.get(`${url}/users`)
}

export function register(data) {
    return request.post(`${url}/users/register`, data)
}

export function login(data) {
    return request.post(`${url}/users/login`, data)
}

export function logout(data) {
    return request.post(`${url}/users/logout`, data)
}

export function createPost(data) {
    return request.post(`${url}/posts`, data)
}

export function readPost(postId) {
    return request.get(`${url}/posts/${postId}`)
}

export function updatePost(postId, data) {
    return request.put(`${url}/posts/${postId}`, data)
}

export function deletePost(postId) {
    return request.del(`${url}/posts/${postId}`)
}

export function createComment(postId, data) {
    return request.post(`${url}/posts/${postId}/comments`, data)
}