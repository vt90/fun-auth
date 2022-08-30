import React from 'react';
import Link from "next/link";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import { useUser } from '@auth0/nextjs-auth0';

export default function Profile() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                </Link>

                <Link href="/profile">
                    <Typography>
                        Profile
                    </Typography>
                </Link>
            </Breadcrumbs>
            {user && (
                <div>
                    <pre>{JSON.stringify(user, null, 2)}</pre>

                    <Button component="a" href="/api/auth/logout">Logout</Button>
                </div>
            )}
        </>
    );
}
