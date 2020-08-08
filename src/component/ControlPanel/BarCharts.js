import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import ReactEcharts from "echarts-for-react";

const useStyles = makeStyles(theme => ({
    root: {
        flex: '0 0 300px',
        padding: theme.spacing(1),
    },
}));

function BarCharts({d}) {
    const classes = useStyles();
    const bars = d.bars;

    const getOption = () => {
        return {
            animation: false,
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            toolbox: {
                feature: {
                    brush: {
                        type: ['lineX', 'clear'],
                        title: {
                            lineX: 'Select Years',
                            clear: 'Clear Selection',
                        }
                    }
                }
            },
            legend: {
                data: ['papers', 'images'],
                left: 10,
            },
            xAxis: [
                {
                    type: 'category',
                    data: bars.map(bar => bar.year),
                    axisLabel: {
                        fontSize: 14,
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        fontSize: 14,
                    },
                }
            ],
            tooltip: {},
            grid: [
                {
                    left: 50,
                    bottom: 30,
                }
            ],
            textStyle: {
                fontSize: 16,
            },
            series: [
                {
                    name: 'papers',
                    type: 'bar',
                    stack: 'stat',
                    data: bars.map(bar => bar.papers),
                },
                {
                    name: 'images',
                    type: 'bar',
                    stack: 'stat',
                    data: bars.map(bar => bar.images),
                },
            ]
        }
    };

    return <div className={classes.root}>
        <ReactEcharts option={getOption()}
                      onEvents={{
                          brushEnd: ({areas}) => {
                              const brushRange = areas[0].coordRange;
                              const yearRange = brushRange.map(val => val + bars[0].year);
                              d.updateFilter('Years', yearRange);
                          },
                          brushselected: ({batch}) => {
                              const {areas} = batch[0];
                              if (areas.length !== 0) return;
                              d.updateFilter('Years', []);
                          }
                      }}/>
    </div>
}

export default inject('d')(observer(BarCharts));
