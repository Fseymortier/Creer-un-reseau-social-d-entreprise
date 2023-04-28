import React, { useState, useEffect } from "react";
import PostDataService from "../../services/PostService";
import { Link } from "react-router-dom";
import "../../styles/PostList.css";
import Like from "./like";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function retrievePosts() {
            const response = await PostDataService.getAll();
            setPosts(response.reverse());
        }
        retrievePosts();
    }, []);

    return (
        <div className="container_postList">
            <h1 className="title_posts_list">Liste des Posts</h1>
            {posts &&
                posts.map((post) =>
                    post.imageUrl ? (
                        <Link
                            key={post.id}
                            to={"/posts/" + post.id}
                            className="post_list_item "
                        >
                            <h2 className="post_title">{post.title}</h2>
                            <p className="post_description">
                                {post.description}
                            </p>
                            <img
                                className="postList_img"
                                src={post.imageUrl}
                                alt="téléchargé par un utilisateur"
                            />

                            <div className="author_like">
                                <p>Auteur: {post.author}</p>
                                <Like id={post.id} />
                            </div>
                        </Link>
                    ) : (
                        <Link
                            key={post.id}
                            to={"/posts/" + post.id}
                            className="post_list_item "
                        >
                            <p className="author">{post.author}</p>
                            <h2 className="post_title">{post.title}</h2>
                            <p className="post_description">
                                {post.description}
                            </p>
                            <div className="author_like">
                                <Like id={post.id} />
                            </div>
                        </Link>
                    )
                )}
        </div>
    );
};
export default PostList;
