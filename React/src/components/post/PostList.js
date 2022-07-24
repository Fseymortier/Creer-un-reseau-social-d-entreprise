import React, { useState, useEffect } from 'react'
import PostDataService from '../../services/PostService'
import { Link } from 'react-router-dom'
import '../../styles/PostList.css'
//import Like from './like';

const PostList = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function retrievePosts() {
            const response = await PostDataService.getAll()
            setPosts(response)
        }
        retrievePosts()
    }, [])

    return (
        <div className="container_postList">
            <h1>Liste des Posts</h1>
            {posts &&
                posts.map(post => (
                    <Link
                        key={post.id}
                        to={'/posts/' + post.id}
                        className="post_list_item "
                    >
                        <h1 className="post_title">{post.title}</h1>
                        <p>{post.description}</p>
                        <img
                            className="postList_img"
                            src={post.imageUrl}
                            alt="téléchargé par un utilisateur"
                        />
                        <div className="author_like">
                            <p>Auteur: {post.author}</p>
                        </div>
                    </Link>
                ))}
        </div>
    )
}
export default PostList
