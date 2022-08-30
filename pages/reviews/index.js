import React from 'react';
import Link from 'next/link'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Head from "next/head";

const Reviews = (props) => {
    const {
        reviews,
    } = props;

    return (
        <>
            <Head>
                <title>Reviews</title>
            </Head>

            <main className="main">
                <Typography variant="h1" gutterBottom>
                    <strong>
                        Reviews
                    </strong>
                </Typography>

                <Grid container spacing={2} alignItems="center" justifyContent="center" flexWrap="wrap">
                    {
                        reviews.map(({ firstName, lastName, id }) => (
                            <Grid item xs={6} md={4} key={id} className="card">
                                <Link href={`/reviews/${encodeURIComponent(id)}`}>
                                    <a>
                                        <Typography variant="h4" gutterBottom>
                                            {firstName} {lastName} &rarr;
                                        </Typography>
                                    </a>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const db = require('../../data/db.json');

    return {
        props: {
            reviews: db.map((review) => ({ ...review, reviewSessions: null })),
        },
    };
}

export default Reviews;
