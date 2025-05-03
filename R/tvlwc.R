# AUTO GENERATED FILE - DO NOT EDIT

#' @export
tvlwc <- function(id=NULL, chartOptions=NULL, click=NULL, crosshair=NULL, fullChartOptions=NULL, fullSeriesOptions=NULL, height=NULL, panesHeights=NULL, priceScaleWidths=NULL, seriesData=NULL, seriesMarkers=NULL, seriesOptions=NULL, seriesPaneIds=NULL, seriesPriceLines=NULL, seriesTypes=NULL, timeRangeVisibleLogicalRange=NULL, timeRangeVisibleRange=NULL, timeScaleHeight=NULL, timeScaleWidth=NULL, width=NULL) {
    
    props <- list(id=id, chartOptions=chartOptions, click=click, crosshair=crosshair, fullChartOptions=fullChartOptions, fullSeriesOptions=fullSeriesOptions, height=height, panesHeights=panesHeights, priceScaleWidths=priceScaleWidths, seriesData=seriesData, seriesMarkers=seriesMarkers, seriesOptions=seriesOptions, seriesPaneIds=seriesPaneIds, seriesPriceLines=seriesPriceLines, seriesTypes=seriesTypes, timeRangeVisibleLogicalRange=timeRangeVisibleLogicalRange, timeRangeVisibleRange=timeRangeVisibleRange, timeScaleHeight=timeScaleHeight, timeScaleWidth=timeScaleWidth, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Tvlwc',
        namespace = 'dash_tvlwc',
        propNames = c('id', 'chartOptions', 'click', 'crosshair', 'fullChartOptions', 'fullSeriesOptions', 'height', 'panesHeights', 'priceScaleWidths', 'seriesData', 'seriesMarkers', 'seriesOptions', 'seriesPaneIds', 'seriesPriceLines', 'seriesTypes', 'timeRangeVisibleLogicalRange', 'timeRangeVisibleRange', 'timeScaleHeight', 'timeScaleWidth', 'width'),
        package = 'dashTvlwc'
        )

    structure(component, class = c('dash_component', 'list'))
}
