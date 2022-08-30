import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data01 = [
    { x: -2, y: 200, z: 200 },
    { x: -3, y: 100, z: 260 },
    { x: 1, y: 300, z: 400 },
    { x: 4, y: 250, z: 280 },
    { x: -1, y: 400, z: 500 },
    { x: 3, y: 280, z: 200 },
];
const data02 = [
    { x: -2, y: 260, z: 240 },
    { x: -2, y: 290, z: 220 },
    { x: 3, y: 290, z: 250 },
    { x: 4, y: 250, z: 210 },
    { x: 5, y: 280, z: 260 },
    { x: -5, y: 220, z: 230 },
];

// const AXIS_STROKE = 'rgba(0,0,0,0)';
const AXIS_STROKE = '#FFFFFF';

const EvaluationGradesChart = () => {
    return (
        <ScatterChart
            width={860}
            height={930}
            margin={{
                top: 50,
                right: 0,
                bottom: 20,
                // left: -55,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" range={[-5, 5]} name="stature" stroke={AXIS_STROKE}  />
            <YAxis type="number" dataKey="x" range={[-5, 5]} name="weight"  stroke={AXIS_STROKE}  />
            <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" stroke={AXIS_STROKE} />
            <Scatter name="A school" data={data01} fill="#8884d8" shape="star" />
            <Scatter name="B school" data={data02} fill="#82ca9d" shape="triangle" />
        </ScatterChart>
    );
}

export default EvaluationGradesChart;
