import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LikeService from '../../services/like.service'
import AuthService from '../../services/auth.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

const RatePost = () => {
    const { id } = useParams()
    const currentUser = AuthService.getCurrentUser()
    const currentPostId = id
    const [likes, setLikes] = useState([])

    useEffect(() => {
        async function getLikes() {
            const response = await LikeService.getAll(id)
            setLikes(response)
        }
        getLikes()
    }, [])

    function handleLike(e) {
        e.preventDefault()
        var data = {
            postId: currentPostId,
            userId: currentUser.id,
        }
        LikeService.like(id, data)
        window.location.reload()
    }
    function VerifyRate() {
        let verifyLike = false
        for (var z = 0; z < likes.length; z++) {
            if (
                likes[z].postId == currentPostId &&
                likes[z].userId == currentUser.id
            ) {
                verifyLike = true
                return (
                    <FontAwesomeIcon
                        icon={solid('heart')}
                        className="icon_heart"
                        onClick={handleLike}
                    />
                )
            }
        }
        if (!verifyLike) {
            return (
                <FontAwesomeIcon
                    icon={regular('heart')}
                    className="icon_heart"
                    onClick={handleLike}
                />
            )
        }
    }
    return (
        <div className="container_like">
            <VerifyRate />
            <p className="number_of_like">{likes.length}</p>
        </div>
    )
}
export default RatePost
