import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

    const onDomainClick = (domain) => {
        const element = document.getElementById(domain);
        const headerOffset = 180;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        document.getElementById('performance-report').scrollBy({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    const onChartElementClick = (chartElement) => {
        const {data} = chartElement;
        const elementInfo = data[2];
        const elementId = elementInfo?.analysedBehaviour;

        if (elementId) {
            const element = document.getElementById(elementInfo?.analysedBehaviour);
            const headerOffset = 270;

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            document.getElementById('performance-report').scrollBy({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (!reviewData) {
        return '404';
    }

    return (
        <>
            {performanceReviewInfo && (
                <Grid container alignItems="center" columns={10}>
                    <Grid item xs={10} md={5} xl={6}>
                        <Box sx={{ mx: 4, mt: 8 }}>
                            <PerformanceChart
                                data={performanceReviewInfo}
                                onChartElementClick={onChartElementClick}
                                onDomainClick={onDomainClick}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item xs={10} md={5} xl={4}
                        sx={{ backgroundColor: 'background.paper', minHeight: '100vh',}}
                    >
                        <Box sx={{ ml: 6, my: 8 }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography component="h1" variant="h4">
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
                                                        size="small"
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
                            </Box>

                            <PerformanceReport
                                data={performanceReviewInfo}
                            />
                        </Box>
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
