import React, { useState } from 'react'
import PostDataService from '../../services/PostService'
import AuthService from '../../services/auth.service'
import '../../styles/AddPost.css'

const AddPost = () => {
    const currentUser = AuthService.getCurrentUser()
    const [post, setPost] = useState('')
    const [message, setMessage] = useState('')
    const [selectedFile, SetSelectedFile] = useState('')

    function handleInputChange(event) {
        const { name, value } = event.target
        setPost({ ...post, [name]: value })
    }
    function handleFileSelect(e) {
        SetSelectedFile(e.target.files[0])
    }
    function savePost(e) {
        e.preventDefault()
        setMessage('')
        var data = {
            author: currentUser.nickname,
            title: post.title,
            description: post.description,
            imageUrl: selectedFile,
        }
        PostDataService.create(data)
            .then(data => {
                setMessage('Post créer avec succès')
                window.location.reload()
                return data
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setMessage(resMessage)
            })
    }
    return (
        <div className="container_addpost">
            <h1>Créer un Post</h1>
            <form
                className="container_item_addpost"
                contentype="multipart/form-data"
            >
                <label className="label_addpost" htmlFor="title">
                    Titre:
                    <textarea
                        type="text"
                        className="textarea_addpost"
                        id="title"
                        required
                        value={post.title}
                        onChange={handleInputChange}
                        name="title"
                    />
                </label>
                <label className="label_addpost" htmlFor="description">
                    Description:
                    <textarea
                        type="text"
                        className="textarea_addpost"
                        id="description"
                        required
                        value={post.description}
                        onChange={handleInputChange}
                        name="description"
                    />
                </label>
                <label className="label_addpost" htmlFor="imageUrl">
                    Image:
                    <input
                        type="file"
                        name="imageUrl"
                        id="imageUrl"
                        onChange={handleFileSelect}
                    />
                </label>
                <button onClick={savePost} className="btn_addpost">
                    Ajouter le post
                </button>
            </form>
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
        </div>
    )
}
export default AddPost
