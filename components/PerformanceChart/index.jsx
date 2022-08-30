import React from 'react';
import {useTheme} from '@mui/material/styles';
import EChartsNextForReactCore from 'echarts-next-for-react';
import {COLORS, DOMAINS, RATINGS} from '../../lib/performanceManagement';
import {CHART_AREA_HEIGHT} from "../../lib/constants";
import styles from './index.module.scss';

const CHART_CONFIG = {
    AREA_OPACITY: 0.9,
}

const PerformanceChart = ({data, onChartElementClick}) => {
    const theme = useTheme();
    const option = {
        polar: {radius: '100%'},
        tooltip: {
            className: styles.tooltip,
            formatter: function (params) {
                const entryDetails = params.value[2];
                const { domain, analysedBehaviour, review } = entryDetails;
                return [domain, analysedBehaviour, review].join('<br /><br />');
            },
        },
        color: COLORS.map((color) => `rgba(${color.join(', ')}, ${CHART_CONFIG.AREA_OPACITY})`),
        angleAxis: {
            type: 'value',
            data: DOMAINS,
            min: 0,
            max: 1,
            splitNumber: DOMAINS.length,
            splitLine: {
                show: true,
                lineStyle: {color: 'rgba(255, 255, 255, 0.4)'},
            },
            axisLabel: {show: false},
            axisTick: {show: false},
        },
        radiusAxis: {
            type: 'category',
            data: RATINGS,
            axisLabel: {
                color: '#FFFFFF',
                rotate: 45,
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: RATINGS.map((rating, index) => `rgba(255, 255, 255, ${0.05 * (RATINGS.length - index)})`),
                }
            },
        },
        series: [
            ...RATINGS.map((rating, index) => {
                const indexStrokeWidth = RATINGS.length - index;
                const indexEndRadius = (100 / RATINGS.length) * (index + 1);
                const indexStartRadius = indexEndRadius - indexStrokeWidth;
                return ({
                    type: 'pie',
                    radius: [`${indexStartRadius}%`, `${indexEndRadius}%`],
                    label: {show: false},
                    data: DOMAINS.map((d) => ({value: 1})),
                    silent: true,
                })
            }),
            {
                name: 'Punch Card',
                type: 'scatter',
                coordinateSystem: 'polar',
                symbol: (val) => {
                    const {progress} = val[2];
                    return progress
                        ? 'triangle'
                        : 'circle';
                },
                symbolSize: (val) => {
                    const {progress} = val[2];
                    return progress
                        ? 18
                        : 12;
                },
                symbolRotate: (val) => {
                    const {progress} = val[2];
                    return progress < 0
                        ? 180
                        : 0;
                },
                itemStyle: {
                    shadowColor: '#5E5E5E',
                    shadowBlur: 3,
                    color: ({data}) => {
                        const {domain, progress} = data[2];
                        const domainIndex = DOMAINS.indexOf(domain);
                        const color = COLORS[domainIndex].join(', ');
                        const opacity = progress ? 1 : 0.7;
                        return `rgba(${color}, ${opacity})`;
                    },
                },
                data: data
            },
        ]
    };

    return (
        <div style={{position: 'relative', minHeight: CHART_AREA_HEIGHT}}>
            <EChartsNextForReactCore
                option={option}
                opts={{height: CHART_AREA_HEIGHT}}
                onEvents={{
                    'click': onChartElementClick,
                }}
            />
        </div>
    );
};

export default PerformanceChart;
