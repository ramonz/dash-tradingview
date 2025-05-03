# AUTO GENERATED FILE - DO NOT EDIT

export tvlwc

"""
    tvlwc(;kwargs...)

A Tvlwc component.
Tradingview Lightweight Chart object
Keyword arguments:
- `id` (String; optional): The ID of this component
- `chartOptions` (Dict; optional): Object containing all chart options
See https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ChartOptions for possible options
- `click` (Dict; optional): Last-clicked on chart coordinates; read-only
- `crosshair` (Dict; optional): Crosshair coordinates; read-only
- `fullChartOptions` (Dict; optional): Full chart options including defaults; read-only
- `fullSeriesOptions` (Dict; optional): Full series options including defaults; read-only
- `height` (String | Real; optional): Sets height of the parent div of the chart
- `panesHeights` (optional): Height of panes; read-only. panesHeights has the following type: Array of lists containing elements 'paneId', 'height'.
Those elements have the following types:
  - `paneId` (Real; required)
  - `height` (Real; required)s
- `priceScaleWidths` (optional): Width of price scales (only left & right price scales are supported); read-only. priceScaleWidths has the following type: Dict with Strings as keys and values of type Array of lists containing elements 'paneId', 'scaleId', 'width'.
Those elements have the following types:
  - `paneId` (Real; required)
  - `scaleId` (String; required)
  - `width` (Real; required)s
- `seriesData` (Array of Array of Dictss; optional): Data for the series
- `seriesMarkers` (Array of Array of Dictss; optional): Additional markers for the series
- `seriesOptions` (Array of Dicts; optional): Options for the series
- `seriesPaneIds` (Array of Reals; optional): Panel ID for series. Default is 0
- `seriesPriceLines` (Array of Array of Dictss; optional): Additional price lines for the series
- `seriesTypes` (Array of a value equal to: 'bar', 'candlestick', 'area', 'baseline', 'line', 'histogram's; optional): Type of the series
- `timeRangeVisibleLogicalRange` (Dict; optional): Visible logical range (bar numbers); read-only
- `timeRangeVisibleRange` (Dict; optional): Visible time range (dates); read-only
- `timeScaleHeight` (Real; optional): Height of time scale; read-only
- `timeScaleWidth` (Real; optional): Width of time scale; read-only
- `width` (String | Real; optional): Sets width of the parent div of the chart
"""
function tvlwc(; kwargs...)
        available_props = Symbol[:id, :chartOptions, :click, :crosshair, :fullChartOptions, :fullSeriesOptions, :height, :panesHeights, :priceScaleWidths, :seriesData, :seriesMarkers, :seriesOptions, :seriesPaneIds, :seriesPriceLines, :seriesTypes, :timeRangeVisibleLogicalRange, :timeRangeVisibleRange, :timeScaleHeight, :timeScaleWidth, :width]
        wild_props = Symbol[]
        return Component("tvlwc", "Tvlwc", "dash_tvlwc", available_props, wild_props; kwargs...)
end

