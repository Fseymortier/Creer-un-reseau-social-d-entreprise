import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';
import AuthService from '../../services/auth.service';
import Like from './like';
import Com from './com';
import NbComs from './NbComs';
import '../../styles/Post.css';

const Post = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const postId = parseInt(id);
    const currentUser = AuthService.getCurrentUser();
    const [currentPost, setCurrentPost] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, SetSelectedFile] = useState('');

    function getPost(id) {
        PostService.get(id)
            .then((response) => {
                setCurrentPost(response);
            })
            .catch((e) => {
                setMessage(e);
            });
    }
    useEffect(() => {
        if (id) getPost(id);
    }, [id]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    }

    function handleFileSelect(e) {
        SetSelectedFile(e.target.files[0]);
    }

    function updatePost(e) {
        e.preventDefault();
        var data = {
            title: currentPost.title,
            description: currentPost.description,
            imageUrl: selectedFile,
        };
        PostService.update(id, data)
            .then(() => {
                setMessage('Le Post à bien été modifié');
            })
            .catch((e) => {
                setMessage(e);
            });
    }
    function deletePost() {
        PostService.remove(id)
            .then(() => {
                setMessage('Le Post à bien été supprimé');
                navigate('/posts');
            })
            .catch(() => {
                setMessage('Erreur pendant la suppression du post');
            });
    }
    return (
        <div className="container_post flex">
            <h1 className="title">Post</h1>
            {currentUser.nickname === currentPost.author || currentUser.role === 'admin' ? (
                <div className="content_post flex">
                    <form className="form_modifyPost flex">
                        <label className="label_modify_post" htmlFor="title">
                            Titre :
                            <textarea
                                type="text"
                                className="input_modify_post"
                                id="title"
                                name="title"
                                value={currentPost.title}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="label_modify_post" htmlFor="description">
                            Description :
                            <textarea
                                type="text"
                                className="input_modify_post"
                                id="description"
                                name="description"
                                value={currentPost.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="label_modify_post" htmlFor="imageUrl">
                            Image :<br />
                            <input
                                type="file"
                                name="imageUrl"
                                id="imageUrl"
                                onChange={handleFileSelect}
                            />
                        </label>
                    </form>
                    <div className="container_btns flex">
                        <button type="submit" className="btn" onClick={updatePost}>
                            {/*a modifier pour eviter la creation de post*/}
                            Modifier
                        </button>
                        <button className="btn" onClick={deletePost}>
                            {/*a modifier pour eviter la creation de post*/}
                            Supprimer
                        </button>
                    </div>
                    <div className="container_like_com flex">
                        <span className="likes_coms flex">
                            <Like id={postId} />
                            <NbComs id={postId} />
                        </span>
                    </div>
                    <Com id={postId} />
                </div>
            ) : (
                <div className="content_post flex">
                    <p className="author">{' ' + currentPost.author}</p>
                    <h2 className="title_post">{currentPost.title}</h2>
                    <p className="post_description">{currentPost.description}</p>
                    {currentPost.imageUrl ? (
                        <img
                            className="postList_img"
                            src={currentPost.imageUrl}
                            alt="téléchargé par un utilisateur"
                        />
                    ) : (
                        <></>
                    )}
                    <div className="container_like_com flex">
                        <span className="likes_coms flex">
                            <Like id={postId} />
                            <NbComs id={postId} />
                        </span>
                    </div>
                    <Com id={postId} />
                </div>
            )}
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};
export default Post;
