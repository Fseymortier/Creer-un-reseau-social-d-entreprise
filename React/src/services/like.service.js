import http from '../http-common'
import authHeader from './auth-header'

async function getAll() {
    const response = await http.get('/likes', { headers: authHeader() })
    return response.data
}
function like(data) {
    return http.post(`/likes`, data, { headers: authHeader() })
}
function removeByPost(id) {
    return http.delete(
        `/likes/${id}`,
        { where: { postId: id } },
        { headers: authHeader() }
    )
}
const LikeService = {
    getAll,
    like,
    removeByPost,
}

export default LikeService
