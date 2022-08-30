import React from "react";
import Container from "@mui/material/Container";

const Layout = (props) => {
    return (
        <Container maxWidth="xl">
            {props.children}
        </Container>
    );
}

export default Layout;
