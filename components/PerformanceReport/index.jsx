import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import PerformanceReportTimeline from "./Timeline";
import {CHART_AREA_HEIGHT} from "../../lib/constants";
import styles from './index.module.scss';
import {COLORS} from "../../lib/performanceManagement";

const PerformanceReport = (props) => {
    const { data } = props;

    const [groupedDataByQuestion, setGroupDataByQuestion] = useState(null);


    useEffect(() => {
        setGroupDataByQuestion(data.reduce((acc, curr) => {
            const reviewInfo = curr[2];

            if (!acc[reviewInfo.domain]) acc[reviewInfo.domain] = [];

            acc[reviewInfo.domain].push(reviewInfo);

            return acc;
        }, {}));
    }, [data]);

    return (
        groupedDataByQuestion && (
        <List
            id="performance-report"
            sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: CHART_AREA_HEIGHT,
                '& ul': { padding: 0, paddingRight: 10 },
            }}
            subheader={<li />}
        >
            {Object.keys(groupedDataByQuestion).map((domain, index) => {
                const domainQuestions = groupedDataByQuestion[domain];

                return (
                    <li key={`section-${domain}`}>
                        <ul>
                            <ListSubheader sx={{ pb: 1 }}>
                                <Typography
                                    variant="h3"
                                    className={styles.domain}
                                    gutterBottom
                                    sx={[
                                        {
                                            '&:after': {
                                                backgroundColor: `rgb(${COLORS[index % COLORS.length].join(', ')})`,
                                            },
                                        },
                                    ]}
                                >
                                    {domain}
                                </Typography>
                            </ListSubheader>
                            {domainQuestions.map((question) => (
                                <ListItem key={question.analysedBehaviour}>
                                    <ListItemText primary={
                                        <Box
                                            id={question.analysedBehaviour}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                minHeight: CHART_AREA_HEIGHT - 80
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="h6" gutterBottom>
                                                    {question.analysedBehaviour}
                                                </Typography>

                                                <PerformanceReportTimeline reviewItem={question} />
                                            </Box>
                                        </Box>
                                    } disableTypography={true} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                );
            })}
        </List>)
    );
};

export default PerformanceReport;
