import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { StyleURL } from "@geostarters/common";
import PropTypes from "prop-types";

import * as CONSTANTS from "../constants";
import sheet from "./styles/sheet";

var Map = function (_React$Component) {
	_inherits(Map, _React$Component);

	function Map(props) {
		_classCallCheck(this, Map);

		var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

		MapboxGL.setAccessToken(_this.props.mapboxToken || "");

		return _this;
	}

	_createClass(Map, [{
		key: "getObjectLayerType",
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
		key: "createRNLayers",
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
		key: "getObjectSourceType",
		value: function getObjectSourceType(source, layers, index) {

			var res = void 0;

			switch (source.type) {

				case CONSTANTS.SOURCE_TYPE_VECTOR:
					res = React.createElement(
						MapboxGL.VectorSource,
						{ id: index, url: source.url },
						layers
					);
					break;

				case CONSTANTS.SOURCE_TYPE_RASTER:
					{

						var rasterProps = {
							id: index,
							url: source.url,
							minZoomLevel: source.minzoom,
							maxZoomLevel: source.maxzoom,
							tileSize: source.tileSize,
							tms: source.scheme === CONSTANTS.SCHEME_TMS
						};
						res = React.createElement(
							MapboxGL.RasterSource,
							rasterProps,
							layers
						);
						break;
					}
				case CONSTANTS.SOURCE_TYPE_GEOJSON:
					{

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
					}
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
		key: "renderMapData",
		value: function renderMapData(mapData) {
			var _this3 = this;

			var renderSources = [];

			var RNLayers = this.createRNLayers(mapData.layers);

			mapData.sources.forEach(function (source, index) {

				renderSources.push(_this3.getObjectSourceType(source, RNLayers[source.id], index));
			});
		}
	}, {
		key: "onRegionDidChange",
		value: function onRegionDidChange(view) {

			if (this.props.onRegionDidChange) {

				this.props.onRegionDidChange(view);
			}
		}
	}, {
		key: "onPress",
		value: function onPress(event) {

			if (this.props.onPress) {

				this.props.onPress(event);
			}
		}
	}, {
		key: "getVisibleBoundsInViewCoordinates",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
				var bounds, viewCoords, maxX, minX, maxY, minY;
				return _regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.getVisibleBounds();

							case 2:
								bounds = _context.sent;
								_context.next = 5;
								return this.getLngLatInViewCoordinates(bounds[0]);

							case 5:
								_context.t0 = _context.sent;
								_context.next = 8;
								return this.getLngLatInViewCoordinates(bounds[1]);

							case 8:
								_context.t1 = _context.sent;
								viewCoords = [_context.t0, _context.t1];
								maxX = Math.max(viewCoords[0][0], viewCoords[1][0]);
								minX = Math.min(viewCoords[0][0], viewCoords[1][0]);
								maxY = Math.max(viewCoords[0][1], viewCoords[1][1]);
								minY = Math.min(viewCoords[0][1], viewCoords[1][1]);
								return _context.abrupt("return", [maxY, maxX, minY, minX]);

							case 15:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getVisibleBoundsInViewCoordinates() {
				return _ref.apply(this, arguments);
			}

			return getVisibleBoundsInViewCoordinates;
		}()
	}, {
		key: "getVisibleBounds",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
				return _regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.map.getVisibleBounds();

							case 2:
								return _context2.abrupt("return", _context2.sent);

							case 3:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getVisibleBounds() {
				return _ref2.apply(this, arguments);
			}

			return getVisibleBounds;
		}()
	}, {
		key: "queryRenderedFeaturesAtPoint",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(bbox, filter, layerIDs) {
				return _regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.map.queryRenderedFeaturesAtPoint(bbox, filter, layerIDs);

							case 2:
								return _context3.abrupt("return", _context3.sent);

							case 3:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function queryRenderedFeaturesAtPoint(_x, _x2, _x3) {
				return _ref3.apply(this, arguments);
			}

			return queryRenderedFeaturesAtPoint;
		}()
	}, {
		key: "queryRenderedFeaturesInRect",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(bbox, filter, layerIDs) {
				return _regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.map.queryRenderedFeaturesInRect(bbox, filter, layerIDs);

							case 2:
								return _context4.abrupt("return", _context4.sent);

							case 3:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function queryRenderedFeaturesInRect(_x4, _x5, _x6) {
				return _ref4.apply(this, arguments);
			}

			return queryRenderedFeaturesInRect;
		}()
	}, {
		key: "getLngLatInViewCoordinates",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(point) {
				return _regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.next = 2;
								return this.map.getPointInView(point);

							case 2:
								return _context5.abrupt("return", _context5.sent);

							case 3:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function getLngLatInViewCoordinates(_x7) {
				return _ref5.apply(this, arguments);
			}

			return getLngLatInViewCoordinates;
		}()
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var mapOptions = Object.assign({}, this.props.options, {
				attributionEnabled: this.props.showAttribution
			});

			return React.createElement(
				MapboxGL.MapView,
				Object.assign({}, mapOptions, {
					ref: function ref(_ref6) {

						_this4.map = _ref6;
					},
					style: sheet.matchParent,
					onRegionDidChange: function onRegionDidChange(view) {
						return _this4.onRegionDidChange(view);
					},
					onPress: function onPress(event) {
						return _this4.onPress(event);
					}
				}),
				this.props.mapData && this.renderMapData(this.props.mapData)
			);
		}
	}]);

	return Map;
}(React.Component);

export default Map;


Map.StyleURL = Object.assign({
	MapboxLight: MapboxGL.StyleURL.Light
}, StyleURL);

// UserTrackingModes as found in https://github.com/mapbox/react-native-mapbox-gl/blob/master/android/rctmgl/src/main/java/com/mapbox/rctmgl/location/UserTrackingMode.java
Map.UserTrackingModes = Object.assign({}, MapboxGL.UserTrackingModes);
// UserLocationVerticalAlignment mode as found in https://github.com/mapbox/react-native-mapbox-gl/blob/master/android/rctmgl/src/main/java/com/mapbox/rctmgl/location/UserLocationVerticalAlignment.java
Map.UserLocationVerticalAlignment = Object.assign({}, MapboxGL.UserLocationVerticalAlignment);
Map.requestAndroidLocationPermissions = MapboxGL.requestAndroidLocationPermissions;

Map.propTypes = {
	options: PropTypes.object, //Has to be MapView options, defined in Mapbox RN docs: https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/MapView.md
	mapboxToken: PropTypes.string,
	mapData: PropTypes.object,
	showAttribution: PropTypes.bool,
	layerEvents: PropTypes.array, //Has to be Array<EventData> from flow-typed
	onRegionDidChange: PropTypes.func,
	onPress: PropTypes.func
};