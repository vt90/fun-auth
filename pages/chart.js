import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const EvaluationCriteriaChart = dynamic(() => import('../components/PerformanceChart'), {
    ssr: false,
});

import data from '../data/corina.json';
import {extractPerformanceDataFromReport} from "../lib/performanceManagement";

const reviewData = extractPerformanceDataFromReport(data);

const Chart = () => {
    const theme = useTheme();

    return (
        <div>
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center'}}>
                <EvaluationCriteriaChart
                    data={reviewData}
                />
            </div>

            <pre>{JSON.stringify(reviewData, null, 2)}</pre>
        </div>
    );
}

export default Chart;

