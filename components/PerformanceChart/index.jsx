import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from '@mui/material/styles/useTheme';
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import EChartsNextForReactCore from 'echarts-next-for-react';
import {COLORS, DOMAINS, RATINGS} from '../../lib/performanceManagement';
import {CHART_AREA_HEIGHT} from "../../lib/constants";
import styles from './index.module.scss';

const CHART_CONFIG = {
    AREA_OPACITY: 0.9,
    RADIUS_PERCENTAGE: 100,
}

const PerformanceChart = ({data, onDomainClick, onChartElementClick}) => {
    const theme = useTheme();

    const option = {
        polar: {radius: `${CHART_CONFIG.RADIUS_PERCENTAGE}%`},
        tooltip: {
            backgroundColor: theme.palette.background.paper,
            className: styles.tooltip,
            formatter: function (params) {
                const {color, value} = params;
                const entryDetails = value[2];
                const {domain, analysedBehaviour, review} = entryDetails;
                return [`<b style="color: ${color}">${domain}</b>`, analysedBehaviour, `<b>${review.substr(4)}</b>`].join('<br />\n');
            },
            textStyle: {color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily,}
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
                color: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                rotate: 30,
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
                const indexEndRadius = (CHART_CONFIG.RADIUS_PERCENTAGE / RATINGS.length) * (index + 1);
                const indexStartRadius = indexEndRadius - indexStrokeWidth;
                return ({
                    name: `pie-${index}`,
                    type: 'pie',
                    radius: [`${indexStartRadius}%`, `${indexEndRadius}%`],
                    label: {show: false},
                    data: DOMAINS.map((d) => ({value: 1, name: d})),
                    silent: true,
                })
            }),
            {
                name: 'polar-series',
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
                        let domainIndex = DOMAINS.indexOf(domain);
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
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} lg={9}>
                <div style={{position: 'relative', minHeight: CHART_AREA_HEIGHT}}>
                    <EChartsNextForReactCore
                        option={option}
                        opts={{height: CHART_AREA_HEIGHT}}
                        onEvents={{
                            'click': onChartElementClick,
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={6} lg={12}>
                            {
                                DOMAINS.map((domain, index) => {
                                    return (
                                        <Box key={domain} sx={{ mb: 2 }}>
                                            <Typography
                                                className={styles.chartLabel}
                                                onClick={() => onDomainClick(domain)}
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
                                        </Box>
                                    );
                                })
                            }
                        </Grid>
                        <Grid item xs={6} lg={12}>
                            <Box >
                                {
                                    [
                                        { name: 'Progress', icon: <ArrowUpIcon fontSize="large" sx={{ ml: -1.2 }} /> },
                                        { name: 'Consistent', icon: <CircleIcon fontSize="8" sx={{ mr: 1 }} /> },
                                        { name: 'Regress', icon: <ArrowDownIcon fontSize="large" sx={{ ml: -1.2 }} /> },
                                    ].map((legendItem) => (
                                        <Typography
                                            key={legendItem.name}
                                            color="text.secondary"
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            {legendItem.icon} { legendItem.name }
                                        </Typography>
                                    ))
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PerformanceChart;
