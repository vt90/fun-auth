import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import PerformanceReportTimeline from "./Timeline";
import {CHART_AREA_HEIGHT} from "../../lib/constants";
import {useTheme} from "@mui/material/styles";

const PerformanceReport = (props) => {
    const { data } = props;

    const [groupedDataByQuestion, setGroupDataByQuestion] = useState(null);
    const theme = useTheme()


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
                maxHeight: {
                    md: CHART_AREA_HEIGHT,
                },
                '& ul': { padding: 0, paddingRight: 6 },
            }}
            subheader={<li />}
        >
            {Object.keys(groupedDataByQuestion).map((domain, index) => {
                const domainQuestions = groupedDataByQuestion[domain];

                return (
                    <li key={`section-${domain}`} id={domain}>
                        <ul>
                            <ListSubheader sx={{ pb: 1, backgroundColor: theme.palette.background.paper }} disableGutters>
                                <Typography
                                    variant="h3"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    {domain}
                                </Typography>
                            </ListSubheader>
                            {domainQuestions.map((question) => (
                                <ListItem key={question.analysedBehaviour} disableGutters>
                                    <ListItemText primary={
                                        <Box
                                            id={question.analysedBehaviour}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                minHeight: CHART_AREA_HEIGHT - 180
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
