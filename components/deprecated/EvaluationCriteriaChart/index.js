import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const RATINGS = [
    'Never',
    'Rarely',
    'Sometimes',
    'Frequently',
    'Always',
];

const DATA = [
    {
        category: 'Domain Competence',
        question: '1. Our colleague creates value for their Team at a level consistent with their seniority level (Junior / Intermediate / Senior / Technical Lead / Technical Manager)',
        currentValue: 5,
        previousValue: 5,
    }
];

const COLORS = [
    [240, 56, 177],
    [0, 196, 156],
    [255, 187, 40],
    [255, 128, 66],
    [0, 136, 254],
];

const SEGMENTS = [
    { name: ' Domain Competence ', value: 1 },
    { name: ' Pragmatism ', value: 1 },
    { name: ' Work Ethic ', value: 1 },
    { name: ' Coaching & Learning ', value: 1 },
    { name: ' Communication ', value: 1 },
];

const START_ANGLE = 0;

const LabelComponent = ({ ratingIndex, index, name, style, fill, x, y, ...rest }) => {
    let xPlacement = x;

    if (ratingIndex < 3) {
        xPlacement = xPlacement - 55;
    }
    else if (ratingIndex === 3) {
        xPlacement = x - 35;
    }

    return (index === 0) && <text {...{ style, x: xPlacement, y: CHART_CONFIG.MAX_RADIUS - 10, fill: '#FFFFFF' }}>{`${RATINGS[ratingIndex]}`}</text>;
}


/*
* Most outer circle = 900
* */

const CHART_CONFIG = {
  MAX_RADIUS: 520,
};

const renderLegendContent = (props) => {
    const { payload } = props;

    return (
        <rect top={0} style={{ position: 'absolute', top: 0, left: 0 }}>
            {
                SEGMENTS.map(({ name }, index) => (
                    <li key={name}>{name}</li>
                ))
            }
        </rect>
    );
}

const EvaluationCriteriaChart = () => {
    return (
        <>
            <PieChart
                height={CHART_CONFIG.MAX_RADIUS * 2}
                width={CHART_CONFIG.MAX_RADIUS * 2}
                margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
            >
                {
                    RATINGS.map((rating, index) => {
                        return (
                            <Pie
                                key={rating}
                                data={SEGMENTS}
                                startAngle={START_ANGLE}
                                endAngle={360 + START_ANGLE}
                                outerRadius={CHART_CONFIG.MAX_RADIUS - ((5 - index % 5) * 90)}
                                onClick={() => console.log(index % 5)}
                                dataKey="value"
                                fill="#8884d8"
                                label={(props) => { return (<LabelComponent {...props} ratingIndex={index}/>) }}
                            >
                                {SEGMENTS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`rgba(${COLORS[index].join(', ')}, 0.2)`}/>
                                ))}
                            </Pie>
                        );
                    })
                }

                <Legend
                    payload={SEGMENTS.map(({ name }, index) => ({
                        value: name,
                        type: 'line',
                        id: 'name',
                        color: `rgb(${COLORS[index].join(', ')})`,
                    }))} />
            </PieChart>
        </>
    );
}

export default EvaluationCriteriaChart;
