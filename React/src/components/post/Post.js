import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostService from '../../services/PostService'
import AuthService from '../../services/auth.service'
import Like from './like'
import '../../styles/Post.css'

const Post = () => {
    const currentUser = AuthService.getCurrentUser()
    const { id } = useParams()
    let navigate = useNavigate()
    const [currentPost, setCurrentPost] = useState('')
    const [message, setMessage] = useState('')
    const [selectedFile, SetSelectedFile] = useState('')

    function getPost(id) {
        PostService.get(id)
            .then(response => {
                setCurrentPost(response)
            })
            .catch(e => {
                setMessage(e)
            })
    }
    useEffect(() => {
        if (id) getPost(id)
    }, [id])
    function handleInputChange(event) {
        const { name, value } = event.target
        setCurrentPost({ ...currentPost, [name]: value })
    }
    function handleFileSelect(e) {
        SetSelectedFile(e.target.files[0])
    }
    function updatePost(e) {
        e.preventDefault()
        var data = {
            title: currentPost.title,
            description: currentPost.description,
            imageUrl: selectedFile,
        }
        PostService.update(id, data)
            .then(() => {
                setMessage('Le Post à bien été modifié')
            })
            .catch(e => {
                setMessage(e)
            })
    }
    function deletePost() {
        PostService.remove(id)
            .then(() => {
                setMessage('Le Post à bien été supprimé')
                navigate('/posts')
            })
            .catch(() => {
                setMessage('Erreur pendant la suppression du post')
            })
    }
    return (
        <div className="container_post">
            {currentUser.nickname == currentPost.author ||
            currentUser.role == 'admin' ? (
                <div className="container_post">
                    <div className="content_modify_post">
                        <h1 className="title_modify_post">
                            Modification de votre Post
                        </h1>
                        <form className="form_modifyPost">
                            <label
                                className="label_modify_post"
                                htmlFor="title"
                            >
                                Titre:
                                <input
                                    type="text"
                                    className="input_modify_post"
                                    id="title"
                                    name="title"
                                    value={currentPost.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label
                                className="label_modify_post"
                                htmlFor="description"
                            >
                                Description:
                                <input
                                    type="text"
                                    className="input_modify_post"
                                    id="description"
                                    name="description"
                                    value={currentPost.description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label
                                className="label_modify_post"
                                htmlFor="imageUrl"
                            >
                                Image:
                                <input
                                    type="file"
                                    name="imageUrl"
                                    id="imageUrl"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </form>
                        <div className="div_author_like">
                            <p className="p_author_like">
                                Auteur:{currentPost.author}
                            </p>
                            <Like />
                        </div>
                        <div className="btn_div">
                            <button
                                className="btn_deletepost"
                                onClick={deletePost}
                            >
                                Supprimer
                            </button>
                            <button
                                type="submit"
                                className="btn_modifypost"
                                onClick={updatePost}
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container_post">
                    <div className="content_post">
                        <h1 className="title_post">{currentPost.title}</h1>
                        <p>{currentPost.description}</p>
                        <img
                            className="postList_img"
                            src={currentPost.imageUrl}
                            alt="téléchargé par un utilisateur"
                        />
                        <div className="div_author_like">
                            <div className="div_author_text">
                                <p className="p_author_like">Auteur:</p>
                                <p className="p_author_like">
                                    <strong>{currentPost.author}</strong>
                                </p>
                            </div>
                            <Like />
                        </div>
                    </div>
                </div>
            )}
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
        </div>
    )
}
export default Post
