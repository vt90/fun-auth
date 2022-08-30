import React from 'react';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const SESSION_TIMESTAMP_FORMAT = 'MMM YYYY';

const PerformanceReportTimeline = (props) => {
    const { reviewItem } = props;

    const extractReviewRating = (review) => {
        if (!review) return review;
        const extractedReviewInfo = review?.split(' - ');
        extractedReviewInfo.splice(0, 1);

        return extractedReviewInfo.join(' - ')
    };

    return (
        <Timeline position="right">
            <TimelineItem>
                <TimelineOppositeContent sx={{ flex: 0 }}>
                    {moment(reviewItem.reviewSession).format(SESSION_TIMESTAMP_FORMAT)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Typography variant="h6">
                        {extractReviewRating(reviewItem.review)}
                    </Typography>

                    <Typography>
                        {reviewItem.notes}
                    </Typography>
                </TimelineContent>
            </TimelineItem>

            {
                reviewItem.previousReviewSession
                    ? (
                        <TimelineItem>
                            <TimelineOppositeContent sx={{ flex: 0 }} color="text.secondary">
                                {moment(reviewItem.previousReviewSession).format(SESSION_TIMESTAMP_FORMAT)}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {extractReviewRating(reviewItem.previousReview)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {reviewItem.previousNotes}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                    : null
            }
        </Timeline>
    );
};

export default PerformanceReportTimeline;
