import http from '../http-common';
import authHeader from './auth-header';

async function getAll(id) {
    const response = await http.get(`/coms/${id}`, {
        headers: authHeader(),
    });
    return response.data;
}
function create(data) {
    return http.post(`/coms`, data, { headers: authHeader() });
}
function update(id, data) {
    return http.put(`/coms/${id}`, data, { headers: authHeader() });
}
async function remove(comId) {
    const response = await http.delete(`/coms/${comId}`, {
        headers: authHeader(),
    });
    return response;
}
const ComService = {
    getAll,
    create,
    update,
    remove,
};
export default ComService;
