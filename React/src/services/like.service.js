import http from '../http-common'
import authHeader from './auth-header'

async function getAll(id) {
    const response = await http.get(`/likes/${id}`, { headers: authHeader() })
    return response.data
}
function like(id, data) {
    return http.post(`/likes/${id}`, data, { headers: authHeader() })
}
const LikeService = {
    getAll,
    like,
}

export default LikeService
