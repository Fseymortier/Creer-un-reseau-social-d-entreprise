import React, { useState, useEffect } from 'react';
import ComServices from '../../services/com.service';
import '../../styles/com.css';

const NbComs = ({ id }) => {
    const [NbComs, setNbComs] = useState('');

    useEffect(() => {
        getComs();
    }, []);

    async function getComs() {
        const response = await ComServices.getAll(id);
        setNbComs(response.length);
    }
    return (
        <p className="container_nbCom">
            {NbComs} {'Commentaire(s)'}
        </p>
    );
};

export default NbComs;
