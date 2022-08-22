import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = ({ title, buttonText }: { title?: string, buttonText?: string }) => {
    return (
        <div style={{ 
            height: "100vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h1>{ title || "Sorry, nothing was found!" }</h1>

            <div className="mt-5">
                <Link to="/">
                    <Button variant="warning">
                        { buttonText || "Back" }
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default NotFound;