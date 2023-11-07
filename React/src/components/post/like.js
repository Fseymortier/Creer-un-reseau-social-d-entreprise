import React, { useState, useEffect } from 'react';
import LikeService from '../../services/like.service';
import AuthService from '../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const Like = ({ id }) => {
    const currentUser = AuthService.getCurrentUser();
    const currentPostId = id;
    const [likes, setLikes] = useState([]);
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        getLikes();
    }, []);

    useEffect(() => {
        verifyRate();
    }, [likes]);

    async function getLikes() {
        const response = await LikeService.getAll(currentPostId);
        setLikes(response);
        setUserLiked(response.some((like) => like.userId === currentUser.id));
    }

    function verifyRate() {
        setUserLiked(likes.some((like) => like.userId === currentUser.id));
    }
    function handleLike(e) {
        e.preventDefault();
        var data = {
            postId: currentPostId,
            userId: currentUser.id,
        };
        LikeService.like(id, data).then(() => {
            getLikes();
            return data;
        });
    }
    function handleDisLike(e) {
        e.preventDefault();
        var data = {
            postId: currentPostId,
            userId: currentUser.id,
        };
        LikeService.like(id, data).then(() => {
            getLikes();
            return data;
        });
    }

    return (
        <div className="container_like flex">
            <p className="number_of_like">{likes.length}</p>
            {userLiked === true ? (
                <FontAwesomeIcon
                    icon={solid('heart')}
                    className="icon_heart solid"
                    onClick={handleDisLike}
                />
            ) : (
                <FontAwesomeIcon
                    icon={regular('heart')}
                    className="icon_heart regular"
                    onClick={handleLike}
                />
            )}
        </div>
    );
};
export default Like;
