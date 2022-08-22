import React, { useEffect, useState, useMemo } from "react";
import api from "../api";
import Pagination from 'react-bootstrap/Pagination';
import { 
    Col, 
    Container, 
    Row, 
    Spinner,
    Form
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
const LOCAL_DATA: string | null = "STAR_WARS_API_DATA";

// ToDo: use real type from back-end for api answer =) 
// Any type is bad, I know, but its easy way to do this test task faster

const Home = () => {
    const [ serverData, setServerData ] : any = useState({});
    const [ activePage, setActivePage ] = useState(1);
    const [ isLoading, setLoading ] = useState(true);
    const [ filterValue, setfilterValue ] = useState<any>(null);

    const filterUsers = (value: string) => {
        if (!value) return setfilterValue(null);

        setfilterValue(value);
    }

    const toggleLoading = (value: boolean) => setLoading(value);

    useEffect(() => {
        const isLocalData = localStorage.getItem(LOCAL_DATA);

        if (isLocalData) {
            setServerData(JSON.parse(isLocalData));
            toggleLoading(false);
        } 
        else {
            api.getAllUsers(activePage).then(
                data =>  {
                    localStorage.setItem(LOCAL_DATA, JSON.stringify(data));
                    setServerData(data || []);
                    toggleLoading(false);
                }
            );
        }

    }, []);

    const loadPage = (page: number) => {
        toggleLoading(true);

        api.getAllUsers(page).then(
            data => {
                toggleLoading(false);
                setServerData(data || [])
            }
        );

        setActivePage(page);
    };

    const UsersList = ({ name } : { name: string }) => {
        return (
            <Link to={`/people/${name}`} key={name} style={{ color: "#fee81a", textDecoration: "none" }}>
                <Row>
                    <Col className="user-item">{ name }</Col>
                </Row>
            </Link>
        );
    };

    const filteredUsers = useMemo(() => 
        serverData?.results?.filter((user: any) => !!filterValue ? user.name.toLowerCase().includes(filterValue) : user), [filterValue, serverData])

    return (
        <Container>
            <div className="display-flex justify-content-center align-items-center">
                <img
                    alt="Logo"
                    src={Logo}
                />
            </div>

            <div className="display-flex justify-content-center align-items-center mb-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Enter name"
                    style={{ maxWidth: "200px" }}
                    onKeyUp={(({ target }: any) => filterUsers(target?.value))}
                />

                <Pagination style={{ marginBottom: 0, marginLeft: "10px" }}>
                    <Pagination.Item
                        disabled={!serverData?.previous}
                        onClick={() => loadPage(activePage - 1)}
                    >
                        Prev
                    </Pagination.Item>
                    <Pagination.Item
                        disabled={!serverData?.next}
                        onClick={() => loadPage(activePage + 1)}
                    >
                        Next
                    </Pagination.Item>
                </Pagination>
            </div>

            { isLoading && 
                <div style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    height: "40vh" 
                }}>
                    <Spinner animation="border" variant="info" />
                </div>  
            }

            {
                !isLoading && filteredUsers.map((user: any) => <UsersList key={user.name} {...user} />)
            }
        </Container>
    );
};

export default Home;