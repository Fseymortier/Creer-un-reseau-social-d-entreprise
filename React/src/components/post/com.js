import React, { useState, useEffect } from 'react';
import ComServices from '../../services/com.service';
import AuthService from '../../services/auth.service';
import '../../styles/com.css';

const Com = ({ id }) => {
    const currentUser = AuthService.getCurrentUser();
    const [message, setMessage] = useState('');
    const [coms, setComs] = useState([]);
    const [com, setCom] = useState('');

    useEffect(() => {
        getComs();
    }, []);

    async function getComs() {
        const response = await ComServices.getAll(id);
        setComs(response.reverse());
    }
    function contentChange(event) {
        const { name, value } = event.target;
        setCom({ ...com, [name]: value }); // on change add new object in post from the value name
    }
    function createCom(e) {
        e.preventDefault();
        setMessage('');
        var data = {
            author: currentUser.nickname,
            postId: id,
            content: com.content,
        };
        ComServices.create(data)
            .then((req) => {
                setMessage(req.data.message);
                getComs();
                return data;
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    }
    async function deleteCom(comId) {
        ComServices.remove(comId)
            .then(() => {
                setMessage('Le commentaire à bien été supprimé');
                setComs((prevComs) =>
                    prevComs.filter((com) => com.id !== comId)
                );
            })
            .catch(() => {
                setMessage('Erreur pendant la suppression du commentaire');
            });
    }
    const listComs = coms.map((com) => (
        <span className="items_coms flex" key={com.id}>
            <p className="coms_authors">{com.author} à commenter:</p>
            <p className="coms_content">{com.content}</p>
            {currentUser.nickname === com.author ||
            currentUser.role === 'admin' ? (
                <button className="btn" onClick={() => deleteCom(com.id)}>
                    {/*a modifier pour eviter la supression de com*/}
                    Supprimer
                </button>
            ) : null}
        </span>
    ));
    return (
        <div className="container_com flex">
            <form className="flex form_com" contentype="multipart/form-data">
                <label className="label_com" htmlFor="content">
                    Commenter :
                    <textarea
                        id="content"
                        type="text"
                        className="txt_com"
                        onChange={contentChange}
                        name="content"
                        value={com.content}
                        maxLength={250}
                    />
                </label>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <button className="btn" onClick={createCom}>
                    {/*a modifier pour eviter la creation de com*/}
                    Ajouter
                </button>
            </form>
            {listComs}
        </div>
    );
};

export default Com;
