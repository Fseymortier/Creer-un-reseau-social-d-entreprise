import http from '../http-common'
import authHeader from './auth-header'

async function getAll() {
    const response = await http.get('/posts', { headers: authHeader() })
    return response.data
}
async function get(id) {
    const response = await http.get(`/posts/${id}`, { headers: authHeader() })
    return response.data
}
function create(data) {
    return http.post('/posts', data, { headers: authHeader() })
}
function update(id, data) {
    return http.put(`/posts/${id}`, data, { headers: authHeader() })
}
async function remove(id) {
    const response = await http.delete(`/posts/${id}`, {
        headers: authHeader(),
    })
    return response
}
const PostService = {
    getAll,
    get,
    create,
    update,
    remove,
}
export default PostService
