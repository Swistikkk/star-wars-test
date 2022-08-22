import React, { useState, useEffect } from "react";
import { Container, Spinner, Button } from "react-bootstrap";
import { useParams, useHref, Link } from 'react-router-dom';
import api from "../api";
import Logo from "../assets/logo.png";

type IUser = {
    birth_year: string,
    eye_color: string, 
    gender: string, 
    name: string, 
    skin_color: string, 
    height: string
}

const DetailInfo = () => {
    const { id } = useParams();
    const [ isLoading, setLoading ] = useState(true);
    const [ user, setUser ] = useState<IUser | null>(null);

    useEffect(() => {
        if (id) {
            api.getUserDetailsByName(id).then(data => {
                setUser(data.results[0]);
                setLoading(false);
            });
        }
    }, []);

    const UserInfo = () => {
        if (!isLoading && !user) return <div>Sorry, user was not found!</div>;

        return (
            <div style={{ textAlign: 'center' }}>
                <p>Name: { user?.name }</p>
                <p>Height: { user?.height }</p>
                <p>Skin color: { user?.skin_color }</p>
                <p>Gender: { user?.gender }</p>
                <p>Eye color: { user?.eye_color }</p>
                <p>Birth year: { user?.birth_year }</p>
            </div>
        );
    }

    return (
        <Container style={{ textAlign: "center"}}>
            <div className="display-flex justify-content-center align-items-center">
                <img
                    alt="Logo"
                    src={Logo} 
                />
            </div>

            { isLoading && <Spinner animation="border" variant="info" /> }
            
            { !isLoading && <UserInfo />}

            { !isLoading && <div className="mt-5">
                <Link to="/"><Button variant="warning">Back</Button></Link>
            </div> }

        </Container>
    );
};

export default DetailInfo;