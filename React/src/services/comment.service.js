import http from '../http-common'
import authHeader from './auth-header'

async function create(content, postId, userId, userNickname) {
    const response = await http.post(
        '/comments',
        {
            content,
            postId,
            userId,
            userNickname,
        },
        { headers: authHeader() }
    )
    return response.data
}
async function getAll() {
    const response = await http.get('/comments', { headers: authHeader() })
    return response.data
}
function remove(id) {
    return http.delete(`/comments/${id}`, { headers: authHeader() })
}
const CommentService = {
    create,
    getAll,
    remove,
}
export default CommentService
