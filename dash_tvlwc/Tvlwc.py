# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
import numbers # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.development.base_component import ComponentType # noqa: F401
except ImportError:
    ComponentType = typing.TypeVar("ComponentType", bound=Component)


class Tvlwc(Component):
    """A Tvlwc component.
Tradingview Lightweight Chart object

Keyword arguments:

- id (string; optional):
    The ID of this component.

- chartOptions (dict; optional):
    Object containing all chart options See
    https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ChartOptions
    for possible options.

- click (dict; optional):
    Last-clicked on chart coordinates; read-only.

- crosshair (dict; optional):
    Crosshair coordinates; read-only.

- fullChartOptions (dict; optional):
    Full chart options including defaults; read-only.

- fullSeriesOptions (dict; optional):
    Full series options including defaults; read-only.

- height (string | number; default 400):
    Sets height of the parent div of the chart.

- panesHeights (list of dicts; optional):
    Height of panes; writeable.

    `panesHeights` is a list of dicts with keys:

    - paneId (number; required)

    - height (number; required)

- priceScaleWidths (dict; optional):
    Width of price scales (only left & right price scales are
    supported); read-only.

    `priceScaleWidths` is a dict with strings as keys and values of
    type list of dicts with keys:

    - paneId (number; required)

    - scaleId (string; required)

    - width (number; required)

- seriesData (list of list of dictss; optional):
    Data for the series.

- seriesMarkers (list of list of dictss; optional):
    Additional markers for the series.

- seriesOptions (list of dicts; optional):
    Options for the series.

- seriesPaneIds (list of numbers; optional):
    Panel ID for series. Default is 0.

- seriesPriceLines (list of list of dictss; optional):
    Additional price lines for the series.

- seriesTypes (list of a value equal to: 'bar', 'candlestick', 'area', 'baseline', 'line', 'histogram's; optional):
    Type of the series.

- timeRangeVisibleLogicalRange (dict; optional):
    Visible logical range (bar numbers); read-only.

- timeRangeVisibleRange (dict; optional):
    Visible time range (dates); read-only.

- timeScaleHeight (number; optional):
    Height of time scale; read-only.

- timeScaleWidth (number; optional):
    Width of time scale; read-only.

- width (string | number; default 600):
    Sets width of the parent div of the chart."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_tvlwc'
    _type = 'Tvlwc'
    PriceScaleWidths = TypedDict(
        "PriceScaleWidths",
            {
            "paneId": typing.Union[int, float, numbers.Number],
            "scaleId": str,
            "width": typing.Union[int, float, numbers.Number]
        }
    )

    PanesHeights = TypedDict(
        "PanesHeights",
            {
            "paneId": typing.Union[int, float, numbers.Number],
            "height": typing.Union[int, float, numbers.Number]
        }
    )

    @_explicitize_args
    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        chartOptions: typing.Optional[dict] = None,
        seriesData: typing.Optional[typing.Sequence[typing.Sequence[dict]]] = None,
        seriesTypes: typing.Optional[typing.Sequence[Literal["bar", "candlestick", "area", "baseline", "line", "histogram"]]] = None,
        seriesOptions: typing.Optional[typing.Sequence[dict]] = None,
        seriesMarkers: typing.Optional[typing.Sequence[typing.Sequence[dict]]] = None,
        seriesPriceLines: typing.Optional[typing.Sequence[typing.Sequence[dict]]] = None,
        seriesPaneIds: typing.Optional[typing.Sequence[typing.Union[int, float, numbers.Number]]] = None,
        crosshair: typing.Optional[dict] = None,
        click: typing.Optional[dict] = None,
        fullChartOptions: typing.Optional[dict] = None,
        priceScaleWidths: typing.Optional[typing.Dict[typing.Union[str, float, int], typing.Sequence["PriceScaleWidths"]]] = None,
        fullSeriesOptions: typing.Optional[dict] = None,
        timeRangeVisibleRange: typing.Optional[dict] = None,
        timeRangeVisibleLogicalRange: typing.Optional[dict] = None,
        timeScaleWidth: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        timeScaleHeight: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        panesHeights: typing.Optional[typing.Sequence["PanesHeights"]] = None,
        width: typing.Optional[typing.Union[str, typing.Union[int, float, numbers.Number]]] = None,
        height: typing.Optional[typing.Union[str, typing.Union[int, float, numbers.Number]]] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'chartOptions', 'click', 'crosshair', 'fullChartOptions', 'fullSeriesOptions', 'height', 'panesHeights', 'priceScaleWidths', 'seriesData', 'seriesMarkers', 'seriesOptions', 'seriesPaneIds', 'seriesPriceLines', 'seriesTypes', 'timeRangeVisibleLogicalRange', 'timeRangeVisibleRange', 'timeScaleHeight', 'timeScaleWidth', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'chartOptions', 'click', 'crosshair', 'fullChartOptions', 'fullSeriesOptions', 'height', 'panesHeights', 'priceScaleWidths', 'seriesData', 'seriesMarkers', 'seriesOptions', 'seriesPaneIds', 'seriesPriceLines', 'seriesTypes', 'timeRangeVisibleLogicalRange', 'timeRangeVisibleRange', 'timeScaleHeight', 'timeScaleWidth', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(Tvlwc, self).__init__(**args)
