var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from "prop-types";

import * as CONSTANTS from "../../constants";
import sheet from './styles/sheet';

var RNMap = function (_React$Component) {
	_inherits(RNMap, _React$Component);

	function RNMap(props) {
		_classCallCheck(this, RNMap);

		var _this = _possibleConstructorReturn(this, (RNMap.__proto__ || Object.getPrototypeOf(RNMap)).call(this, props));

		MapboxGL.setAccessToken(_this.props.mapboxToken || '');

		return _this;
	}

	_createClass(RNMap, [{
		key: 'getObjectLayerType',
		value: function getObjectLayerType(layerType, props) {

			var res = void 0;

			switch (layerType) {

				case CONSTANTS.LAYER_TYPE_BACKGROUND:
					res = React.createElement(MapboxGL.BackgroundLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_CIRCLE:
					res = React.createElement(MapboxGL.CircleLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_FILL:
					res = React.createElement(MapboxGL.FillLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_FILL_EXTRUSION:
					res = React.createElement(MapboxGL.FillExtrusionLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_RASTER:
					res = React.createElement(MapboxGL.RasterLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_LINE:
					res = React.createElement(MapboxGL.LineLayer, props);
					break;

				case CONSTANTS.LAYER_TYPE_SYMBOL:
					res = React.createElement(MapboxGL.SymbolLayer, props);
					break;

				default:
					res = React.createElement(MapboxGL.BackgroundLayer, props);
			}

			return res;
		}
	}, {
		key: 'createRNLayers',
		value: function createRNLayers(layers) {
			var _this2 = this;

			var objLayers = {};

			layers.forEach(function (layer, index) {

				var layerProps = {
					id: layer.id,
					sourceID: layer.source,
					sourceLayerID: layer["source-layer"],
					layerIndex: index,
					filter: layer.filter,
					minZoomLevel: layer.minzoom,
					maxZoomLevel: layer.maxzoom,
					style: Object.assign({}, layer.paint, layer.layout)
				};

				objLayers[layer.source].push(_this2.getObjectLayerType(layer.type, layerProps));
			});
		}
	}, {
		key: 'getObjectSourceType',
		value: function getObjectSourceType(source, layes, index) {

			switch (source.type) {

				case CONSTANTS.SOURCE_TYPE_VECTOR:
					res = React.createElement(
						MapboxGL.VectorSource,
						{ id: index, url: source.url },
						layers
					);
					break;

				case CONSTANTS.SOURCE_TYPE_RASTER:
					var rasterProps = {
						id: index,
						url: source.url,
						minZoomLevel: source.minzoom,
						maxZoomLevel: source.maxzoom,
						tileSize: source.tileSize,
						tms: source.scheme === CONSTANTS.SCHEME_TMS
						//attribution: this.props.showAttribution
					};
					res = React.createElement(
						MapboxGL.RasterSource,
						rasterProps,
						layers
					);
					break;

				case CONSTANTS.SOURCE_TYPE_GEOJSON:
					var geojsonProps = {
						id: index,
						url: source.data,
						shape: source.data,
						cluster: source.cluster,
						clusterRadius: source.clusterRadius,
						clusterMaxZoomLevel: source.clusterMaxZoom,
						maxZoomLevel: source.maxzoom,
						buffer: source.buffer,
						tolerance: source.tolerance
					};
					res = React.createElement(
						MapboxGL.ShapeSource,
						geojsonProps,
						layers
					);
					break;

				default:
					res = React.createElement(
						MapboxGL.VectorSource,
						{ id: index, url: source.url },
						layers
					);
			}

			return res;
		}
	}, {
		key: 'renderMapData',
		value: function renderMapData(mapData) {
			var _this3 = this;

			var renderSources = [];
			var id = 0;

			var RNLayers = this.createRNLayers(mapData.layers);

			mapData.sources.forEach(function (source, index) {

				renderSources.push(_this3.getObjectSourceType(source, RNLayers[source.id], index));
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var mapOptions = Object.assign({}, this.props.options, {
				attributionEnabled: this.props.showAttribution
			});

			return React.createElement(
				MapboxGL.MapView,
				Object.assign({}, mapOptions, {
					ref: function ref(_ref) {
						return _this4.map = _ref;
					},
					style: sheet.matchParent }),
				this.renderMapData(this.props.mapData)
			);
		}
	}]);

	return RNMap;
}(React.Component);

export default RNMap;


Map.propTypes = {
	options: PropTypes.object, //Has to be MapView options, defined in Mapbox RN docs: https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/MapView.md
	mapboxToken: PropTypes.string,
	mapData: PropTypes.object,
	showAttribution: PropTypes.bool,
	layerEvents: PropTypes.array //Has to be Array<EventData> from flow-typed
};