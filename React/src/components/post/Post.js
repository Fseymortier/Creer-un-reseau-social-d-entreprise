import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostService from '../../services/PostService'
import AuthService from '../../services/auth.service'
import LikeService from '../../services/like.service'
import Like from './like'
import Comment from './Comment'
import '../../styles/Post.css'

const Post = () => {
    const currentUser = AuthService.getCurrentUser()
    const { id } = useParams()
    let navigate = useNavigate()
    const [currentPost, setCurrentPost] = useState('')
    const [message, setMessage] = useState('')

    function getPost(id) {
        PostService.get(id)
            .then(response => {
                setCurrentPost(response)
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        if (id) getPost(id)
    }, [id])
    function handleInputChange(event) {
        const { name, value } = event.target
        setCurrentPost({ ...currentPost, [name]: value })
    }
    function updatePost() {
        PostService.update(currentPost.id, currentPost)
            .then(response => {
                console.log(response.data)
                setMessage('Le Post à bien été modifié')
            })
            .catch(e => {
                console.log(e)
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
                        <label className="label_modify_post" htmlFor="title">
                            Titre:
                        </label>
                        <input
                            type="text"
                            className="input_modify_post"
                            id="title"
                            name="title"
                            value={currentPost.title}
                            onChange={handleInputChange}
                        />
                        <label
                            className="label_modify_post"
                            htmlFor="description"
                        >
                            Description:
                        </label>
                        <input
                            type="text"
                            className="input_modify_post"
                            id="description"
                            name="description"
                            value={currentPost.description}
                            onChange={handleInputChange}
                        />
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
                    <Comment />
                </div>
            ) : (
                <div className="container_post">
                    <div className="content_post">
                        <h1 className="title_post">{currentPost.title}</h1>
                        <p>{currentPost.description}</p>
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
                    <Comment />
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
