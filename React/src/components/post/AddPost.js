import React, { useState } from 'react'
import PostDataService from '../../services/PostService'
import AuthService from '../../services/auth.service'
import '../../styles/AddPost.css'

const AddPost = () => {
    const currentUser = AuthService.getCurrentUser()
    const [post, setPost] = useState('')
    const [message, setMessage] = useState('')

    function handleInputChange(event) {
        const { name, value } = event.target
        setPost({ ...post, [name]: value })
    }
    function savePost(e) {
        e.preventDefault()
        setMessage('')
        var data = {
            author: currentUser.nickname,
            title: post.title,
            description: post.description,
        }
        PostDataService.create(data).then(
            response => {
                setPost({
                    author: response.data.author,
                    title: response.data.title,
                    description: response.data.description,
                })
                setMessage('Post créer avec succès')
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setMessage(resMessage)
            }
        )
    }
    return (
        <div className="container_addpost">
            <h1>Créer un Post</h1>
            <div className="container_item_addpost">
                <label className="label_addpost" htmlFor="title">
                    Titre:
                </label>
                <textarea
                    type="text"
                    className="textarea_addpost"
                    id="title"
                    required
                    value={post.title}
                    onChange={handleInputChange}
                    name="title"
                />
                <label className="label_addpost" htmlFor="description">
                    Description:
                </label>
                <textarea
                    type="text"
                    className="textarea_addpost"
                    id="description"
                    required
                    value={post.description}
                    onChange={handleInputChange}
                    name="description"
                />
                <button onClick={savePost} className="btn_addpost">
                    Ajouter le post
                </button>
            </div>
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
        </div>
    )
}
export default AddPost
