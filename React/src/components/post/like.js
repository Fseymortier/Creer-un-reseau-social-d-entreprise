import React, { useState, useEffect } from "react";
import LikeService from "../../services/like.service";
import AuthService from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

const Like = ({ id }) => {
    const currentUser = AuthService.getCurrentUser();
    const currentPostId = id;
    const [likes, setLikes] = useState([]);
    const [userLiked, setUserLiked] = useState(false);
    const [numberLikes, setNumberLikes] = useState();

    useEffect(() => {
        getLikes();
    }, []);

    useEffect(() => {
        VerifyRate();
    }, [likes]);

    async function getLikes() {
        const response = await LikeService.getAll(currentPostId);
        setLikes(response);
        setNumberLikes(response.length);
    }
    async function VerifyRate() {
        likes.forEach((like) => {
            if (
                like.postId === currentPostId &&
                like.userId === currentUser.id
            ) {
                setUserLiked(true);
            } else {
                setUserLiked(false);
            }
        });
    }
    function handleLike(e) {
        e.preventDefault();
        var data = {
            postId: currentPostId,
            userId: currentUser.id,
        };
        LikeService.like(id, data);
        setUserLiked(true);
        setNumberLikes(numberLikes + 1);
    }
    function handleDisLike(e) {
        e.preventDefault();
        var data = {
            postId: currentPostId,
            userId: currentUser.id,
        };
        LikeService.like(id, data);
        setUserLiked(false);
        setNumberLikes(numberLikes - 1);
    }

    return (
        <div className="container_like">
            {userLiked === true ? (
                <FontAwesomeIcon
                    icon={solid("heart")}
                    className="icon_heart solid"
                    onClick={handleDisLike}
                />
            ) : (
                <FontAwesomeIcon
                    icon={regular("heart")}
                    className="icon_heart regular"
                    onClick={handleLike}
                />
            )}
            <p className="number_of_like">{numberLikes}</p>
        </div>
    );
};
export default Like;
