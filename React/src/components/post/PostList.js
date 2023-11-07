import React, { useState, useEffect } from 'react';
import PostDataService from '../../services/PostService';
import { Link } from 'react-router-dom';
import '../../styles/PostList.css';
import Like from './like';
import NbComs from './NbComs';

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
        <div className="container_postList flex">
            <h1 className="title">Liste des Posts</h1>
            {posts &&
                posts.map((post) => (
                    <Link
                        key={post.id}
                        to={'/posts/' + post.id}
                        className="post_list_item flex"
                    >
                        <p className="post_author">{post.author}</p>
                        <h2 className="post_title">{post.title}</h2>
                        <p className="post_description">{post.description}</p>
                        {post.imageUrl ? (
                            <img
                                className="postList_img"
                                src={post.imageUrl}
                                alt="téléchargé par un utilisateur"
                            />
                        ) : (
                            <></>
                        )}
                        <div className="container_like_com flex">
                            <span className="likes_coms flex">
                                <Like id={post.id} />
                                <NbComs id={post.id} />
                            </span>
                        </div>
                    </Link>
                ))}
        </div>
    );
};
export default PostList;
