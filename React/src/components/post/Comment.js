import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CommentService from '../../services/comment.service'
import AuthService from '../../services/auth.service'
import '../../styles/comment.css'

const Comment = () => {
    let navigate = useNavigate()
    const currentUser = AuthService.getCurrentUser()
    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function getComments() {
            const response = await CommentService.getAll()
            setComments(response)
        }
        getComments()
    }, [])
    function onChangeContent(e) {
        const content = e.target.value
        setContent(content)
    }
    function handleComment(e) {
        e.preventDefault()
        setMessage('')
        const comment = {
            content: content,
            postId: id,
            userId: currentUser.id,
            userNickname: currentUser.nickname,
        }
        CommentService.create(comment).then(
            response => {
                setMessage(response.message)
                window.location.reload()
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
    function deleteComment() {
        CommentService.remove(id)
            .then(() => {
                setMessage('Le Post à bien été supprimé')
                window.location.reload()
            })
            .catch(() => {
                setMessage('Erreur pendant la suppression du post')
            })
    }
    function VerifyKnowledge() {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i]
            if (comment.userId === currentUser.id) {
                return (
                    <div className="div_btn_modify_comment">
                        <button
                            className="btn_modify_comment"
                            onClick={deleteComment}
                        >
                            Supprimer
                        </button>
                    </div>
                )
            }
        }
    }
    function GetCommentByPost() {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i]
            if (comment.postId == id) {
                return (
                    <div className="container_allComments">
                        <h3 className="title_comments">
                            {comment.userNickname}
                        </h3>
                        <p className="content">{comment.content}</p>
                        <VerifyKnowledge />
                    </div>
                )
            }
        }
    }
    GetCommentByPost()
    return (
        <div className="container_comment">
            <h1>Commentaires</h1>
            <GetCommentByPost />
            <label className="label_comment" htmlFor="content">
                Ajouter un commentaire
            </label>
            <textarea
                type="text"
                className="textarea_comment"
                required
                value={content}
                onChange={onChangeContent}
                name="content"
            />
            <button className="btn_newComment" onClick={handleComment}>
                Ajouter
            </button>

            {message && (
                <div className="alert alert-danger" role="alert">
                    <p>{message}</p>
                </div>
            )}
        </div>
    )
}

export default Comment
