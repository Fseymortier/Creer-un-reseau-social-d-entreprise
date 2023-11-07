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
        <div className="container_com flex">
            <p className="number_com">{NbComs} Commentaires</p>
        </div>
    );
};

export default NbComs;
