import React, {useEffect, useLayoutEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
    AreaSeries,
    BarSeries,
    BaselineSeries,
    CandlestickSeries,
    createChart,
    createSeriesMarkers,
    HistogramSeries,
    LineSeries,
} from 'lightweight-charts';


/**
 * Tradingview Lightweight Chart object
 */

const Tvlwc = props => {
    const {
        id,
        setProps,
        chartOptions,
        seriesData,
        seriesTypes,
        seriesOptions,
        seriesMarkers,
        seriesPriceLines,
        seriesPaneIds,
        panesHeights,
        width,
        height,
    } = props;

    const chartContainerRef = useRef(null);
    const tvChart = useRef(null);

    // keep track of all series on chart seriesId => seriesApi
    const allSeries = useRef(new Map());

    const handleChartOptions = (chartOptions) => {
        if ('localization' in chartOptions) {
            if ('priceFormatter' in chartOptions.localization) {
                // eslint-disable-next-line no-eval
                chartOptions.localization.priceFormatter = eval(chartOptions.localization.priceFormatter);
            }
            if ('timeFormatter' in chartOptions.localization) {
                // eslint-disable-next-line no-eval
                chartOptions.localization.timeFormatter = eval(chartOptions.localization.timeFormatter);
            }
        }
        return chartOptions;
    };

    const handleMouseEvent = (param) => {
        // match index key (seriesId) to the param by joining through seriesApi\
        param.seriesData = Object.fromEntries(
            [...allSeries.current].map(([seriesId, seriesApi]) => [
                seriesId,
                param.seriesData.get(seriesApi),
            ]),
        );
        return param;
    };

    const handleResize = () => {
        tvChart.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
    };

    const handleChartAfterUpdate = () => {
        requestAnimationFrame(() => {
            let priceScaleWidths = {};
            tvChart.current.panes().forEach((panel, panelId) => {
                let widths = [];
                let leftScale = panel.priceScale('left');
                widths.push({'paneId': panelId, 'scaleId': 'left', 'width': leftScale.width()});
                let rightScale = panel.priceScale('right');
                widths.push({'paneId': panelId, 'scaleId': 'right', 'width': rightScale.width()});
                priceScaleWidths[panelId] = widths;
            });
            setProps({
                priceScaleWidths: priceScaleWidths,
            });
        });

        setProps({
            // get the seriesApi.option() in each of the seriesApi in allSeries; with seriesId (in allSeries) as key
            fullSeriesOptions: Object.fromEntries(
                [...allSeries.current].map(([seriesId, seriesApi]) => [
                    seriesId,
                    seriesApi.options(),
                ]),
            ),
        });
    };

    const handlePaneHeights = () => {
        let panes = tvChart.current.panes()
        let heightsByPaneId = {}
        panesHeights.forEach((v) => {
            heightsByPaneId[v.paneId] = v.height
        })

        panes.forEach((pane, paneId) => {
            let height = heightsByPaneId[paneId];
            if (!height) {
                return
            }
            if (pane.getHeight() !== height) {
                pane.setHeight(height)
            }
        });
    };

    useEffect(() => {
        return () => {
            if (tvChart.current) tvChart.current.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, [chartContainerRef]);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        if (tvChart.current) {
            // tvChart already exists and just apply chart options
            tvChart.current.applyOptions(handleChartOptions(chartOptions));
        } else {
            // tvChart is null, so create one (probably first init)
            tvChart.current = createChart(chartContainerRef.current, handleChartOptions(chartOptions));
            window.addEventListener('resize', handleResize);
            tvChart.current.timeScale().fitContent();
            // update the height and width once upon init
            handleResize();

            tvChart.current.subscribeCrosshairMove((param) => {
                if (setProps) setProps({crosshair: handleMouseEvent(param)});
            });
            tvChart.current.subscribeClick((param) => {
                if (setProps) setProps({click: handleMouseEvent(param)});
            });
        }

        // subscribe timeScale events
        tvChart.current.timeScale().subscribeVisibleTimeRangeChange(() => {
            setProps({timeRangeVisibleRange: tvChart.current.timeScale().getVisibleRange()});
        });
        tvChart.current.timeScale().subscribeVisibleLogicalRangeChange(() => {
            setProps({timeRangeVisibleLogicalRange: tvChart.current.timeScale().getVisibleLogicalRange()});
        });

        tvChart.current.timeScale().subscribeSizeChange(() => {
            setProps({
                timeScaleWidth: tvChart.current.timeScale().width(),
                timeScaleHeight: tvChart.current.timeScale().height(),
            });
        });

        setProps({
            fullChartOptions: tvChart.current.options(),
        });
    }, [chartOptions, width, height]);

    useLayoutEffect(() => {
        if (!tvChart.current) return;

        let heightsByPaneId = {}
        panesHeights.forEach((v) => {
            heightsByPaneId[v.paneId] = v.height
        })

        const newSeries = new Map();
        for (let i = 0; i < seriesData.length; i++) {
            const options = seriesOptions[i] || {};
            const data = seriesData[i] || [];
            const markers = seriesMarkers[i] || [];
            const priceLines = seriesPriceLines[i] || [];
            const paneId = seriesPaneIds[i] || 0;
            const seriesId = i;

            if (options.ignore_autoscale === true) {
                options.autoscaleInfoProvider = () => ({
                    priceRange: {
                        minValue: 1_000_000_000,
                        maxValue: 0,
                    },
                });
            }

            let series;
            switch (seriesTypes[i]) {
                case 'bar':
                    series = tvChart.current.addSeries(BarSeries, options, paneId);
                    break;
                case 'candlestick':
                    series = tvChart.current.addSeries(CandlestickSeries, options, paneId);
                    break;
                case 'area':
                    series = tvChart.current.addSeries(AreaSeries, options, paneId);
                    break;
                case 'baseline':
                    series = tvChart.current.addSeries(BaselineSeries, options, paneId);
                    break;
                case 'line':
                    series = tvChart.current.addSeries(LineSeries, options, paneId);
                    break;
                case 'histogram':
                    series = tvChart.current.addSeries(HistogramSeries, options, paneId);
                    break;
                default:
                    throw new Error('Unknown series type ' + seriesTypes[i]);
            }
            series.setData(data);
            createSeriesMarkers(series, markers);
            for (const pl of priceLines) {
                series.createPriceLine(pl);
            }
            // add this seriesId and seriesApi pair to existing allSeries state
            newSeries.set(paneId * 100 + seriesId, series);
        }

        allSeries.current = newSeries;

        handlePaneHeights();
        handleChartAfterUpdate();

        return () => {
            allSeries.current.forEach((seriesApi) => {
                tvChart.current.removeSeries(seriesApi);
            });
        };
    }, [
        seriesData,
        seriesTypes,
        seriesOptions,
        seriesMarkers,
        seriesPriceLines,
        seriesPaneIds,
    ]);

    // set pane's heights passed by user
    useEffect(() => {
        handlePaneHeights();
    }, [panesHeights]);

    // pane's heights monitoring and reporting
    useEffect(() => {
        if (!tvChart.current || !setProps) return;

        let lastHeights = new Map();
        let timerId = null;
        const interval = 1000;  // milliseconds

        const checkPaneHeights = () => {
            let panes = tvChart.current.panes()
            if (panes.length <= 1) {
                return
            }
            let changed = false;
            const newHeights = new Map();

            panes.forEach((pane, paneId) => {
                const height = pane.getHeight();
                newHeights.set(paneId, height);
                if (lastHeights.get(paneId) !== height) {
                    changed = true;
                }
            });

            if (changed) {
                const serialized = [];
                newHeights.forEach((height, paneId) => {
                    serialized.push({'paneId': paneId, 'height': height});
                });
                setProps({panesHeights: serialized});
                lastHeights = newHeights;
            }

            timerId = setTimeout(checkPaneHeights, interval);
        };

        timerId = setTimeout(checkPaneHeights, interval);

        return () => {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
        };
    }, [seriesPaneIds]);

    return (
        <div id={id} ref={chartContainerRef} style={{height: height, width: width}} />
    );
};

Tvlwc.defaultProps = {
    chartOptions: {},
    seriesData: [],
    seriesTypes: [],
    seriesOptions: [],
    seriesMarkers: [],
    seriesPriceLines: [],
    seriesPaneIds: [],
    crosshair: {},
    click: {},
    fullChartOptions: {},
    priceScaleWidths: {},
    fullSeriesOptions: {},
    timeRangeVisibleRange: {},
    timeRangeVisibleLogicalRange: {},
    timeScaleWidth: null,
    timeScaleHeight: null,
    panesHeights: [],
    width: 600,
    height: 400,
};

Tvlwc.propTypes = {
    /**
     * The ID of this component
     */
    id: PropTypes.string,

    /**
     * Object containing all chart options
     * See https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ChartOptions for possible options
     */
    chartOptions: PropTypes.object,

    /**
     * Data for the series
     */
    seriesData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),

    /**
     * Type of the series
     */
    seriesTypes: PropTypes.arrayOf(PropTypes.oneOf(['bar', 'candlestick', 'area', 'baseline', 'line', 'histogram'])),

    /**
     * Options for the series
     */
    seriesOptions: PropTypes.arrayOf(PropTypes.object),

    /**
     * Additional markers for the series
     */
    seriesMarkers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),

    /**
     * Additional price lines for the series
     */
    seriesPriceLines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),

    /**
     * Panel ID for series. Default is 0
     */
    seriesPaneIds: PropTypes.arrayOf(PropTypes.number),

    /**
     * Crosshair coordinates; read-only
     */
    crosshair: PropTypes.object,

    /**
     * Last-clicked on chart coordinates; read-only
     */
    click: PropTypes.object,

    /**
     * Full chart options including defaults; read-only
     */
    fullChartOptions: PropTypes.object,

    /**
     * Width of price scales (only left & right price scales are supported); read-only
     */
    priceScaleWidths: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                paneId: PropTypes.number.isRequired,
                scaleId: PropTypes.string.isRequired,
                width: PropTypes.number.isRequired,
            }),
        ),
    ),

    /**
     * Full series options including defaults; read-only
     */
    fullSeriesOptions: PropTypes.object,

    /**
     * Visible time range (dates); read-only
     */
    timeRangeVisibleRange: PropTypes.object,

    /**
     * Visible logical range (bar numbers); read-only
     */
    timeRangeVisibleLogicalRange: PropTypes.object,

    /**
     * Width of time scale; read-only
     */
    timeScaleWidth: PropTypes.number,

    /**
     * Height of time scale; read-only
     */
    timeScaleHeight: PropTypes.number,

    /**
     * Height of panes; read-only
     */
    panesHeights: PropTypes.arrayOf(
        PropTypes.shape({
            paneId: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }),
    ),

    /**
     * Sets width of the parent div of the chart
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Sets height of the parent div of the chart
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Set props
     */
    setProps: PropTypes.func,
};

export default Tvlwc;
