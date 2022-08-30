import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import moment from "moment";

const PerformanceChart = dynamic(() => import('../../../components/PerformanceChart'), {
    ssr: false,
});

import {extractPerformanceDataFromReport} from "../../../lib/performanceManagement";
import PerformanceReport from "../../../components/PerformanceReport";

const Review = (props) => {
    const {
        reviewData
    } = props;

    if (!reviewData) {
        return '404';
    }

    const [currentReportIndex, setCurrentReportIndex] = useState(0);
    const [performanceReviewInfo, setPerformanceReviewInfo] = useState([]);
    const reviewSessions = reviewData?.reviewSessions;

    useEffect(() => {
        if (reviewSessions) {
            const currentReview = reviewSessions[Object.keys(reviewSessions)[currentReportIndex]] || [];
            const previousReview = reviewSessions[Object.keys(reviewSessions)[currentReportIndex + 1]] || [];
            const performanceReviewInfo = extractPerformanceDataFromReport(currentReview, previousReview);
            setPerformanceReviewInfo(performanceReviewInfo);
        }
    }, [currentReportIndex]);

    const onChartElementClick = (chartElement) => {
        const {data} = chartElement;
        const elementInfo = data[2];
        const elementId = elementInfo?.analysedBehaviour;

        if (elementId) {
            const element = document.getElementById(elementInfo?.analysedBehaviour);
            const headerOffset = 160;

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            document.getElementById('performance-report').scrollBy({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mb: 3 }}>
                <Link href="/reviews">
                    <Typography component="a" gutterBottom variant="subtitle" color="textSecondary">
                        Reviews /
                    </Typography>
                </Link>
                <Typography component="h1" variant="h3">
                    {reviewData.firstName} {reviewData.lastName}
                </Typography>

                {
                    reviewSessions
                        ? (
                            Object.keys(reviewSessions)
                                .map((session, index) => (
                                    <Button
                                        key={session}
                                        onClick={() => setCurrentReportIndex(index)}
                                        variant={
                                            currentReportIndex === index
                                                ? 'outlined'
                                                : 'default'
                                        }
                                    >
                                        {moment(session).format('MMMM YYYY')}
                                    </Button>
                                ))
                        )
                        : null
                }

            </Container>



            {performanceReviewInfo && (
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} xl={7}>
                        <PerformanceChart
                            data={performanceReviewInfo}
                            onChartElementClick={onChartElementClick}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} xl={5}>
                        <PerformanceReport
                            data={performanceReviewInfo}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export async function getServerSideProps({params}) {
    const db = require('../../../data/db.json');
    const {id} = params;
    const reviewData = db?.find((review) => review.id === id) || null;

    return {
        props: {
            reviewData,
        },
    };
}

export default Review;
