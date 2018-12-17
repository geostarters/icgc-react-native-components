//@flow

import React from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import { StyleURL } from "icgc-js-common";
import PropTypes from "prop-types";

import * as CONSTANTS from "../constants";
import sheet from "./styles/sheet";

export default class Map extends React.Component {

	constructor(props) {

		super(props);
		MapboxGL.setAccessToken(this.props.mapboxToken || "");

	}

	getObjectLayerType(layerType, props) {

		let res;

		switch (layerType) {

		case CONSTANTS.LAYER_TYPE_BACKGROUND :
			res = <MapboxGL.BackgroundLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_CIRCLE:
			res = <MapboxGL.CircleLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_FILL:
			res = <MapboxGL.FillLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_FILL_EXTRUSION:
			res = <MapboxGL.FillExtrusionLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_RASTER:
			res = <MapboxGL.RasterLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_LINE:
			res = <MapboxGL.LineLayer {...props} />;
			break;

		case CONSTANTS.LAYER_TYPE_SYMBOL:
			res = <MapboxGL.SymbolLayer {...props} />;
			break;

		default:
			res = <MapboxGL.BackgroundLayer {...props} />;

		}

		return res;

	}

	createRNLayers(layers) {

		const objLayers = {};

		layers.forEach((layer, index) => {

			const layerProps = {
				id: layer.id,
				sourceID:  layer.source,
				sourceLayerID: layer["source-layer"],
				layerIndex: index,
				filter: layer.filter,
				minZoomLevel: layer.minzoom,
				maxZoomLevel: layer.maxzoom,
				style: {
					...layer.paint,
					...layer.layout
				}
			};

			objLayers[layer.source].push(
				this.getObjectLayerType(layer.type, layerProps)
			);

		});

	}

	getObjectSourceType(source, layers, index) {

		let res;

		switch (source.type) {

		case CONSTANTS.SOURCE_TYPE_VECTOR:
			res = <MapboxGL.VectorSource id={index} url={source.url}>{layers}</MapboxGL.VectorSource>;
			break;

		case CONSTANTS.SOURCE_TYPE_RASTER: {

			const rasterProps = {
				id: index,
				url: source.url,
				minZoomLevel: source.minzoom,
				maxZoomLevel: source.maxzoom,
				tileSize: source.tileSize,
				tms: (source.scheme === CONSTANTS.SCHEME_TMS),
				//attribution: this.props.showAttribution
			};
			res = <MapboxGL.RasterSource  {...rasterProps}>{layers}</MapboxGL.RasterSource>;
			break;

		}
		case CONSTANTS.SOURCE_TYPE_GEOJSON: {

			const geojsonProps = {
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
			res = <MapboxGL.ShapeSource {...geojsonProps}>{layers}</MapboxGL.ShapeSource>;
			break;

		}
		default:
			res = <MapboxGL.VectorSource id={index} url={source.url}>{layers}</MapboxGL.VectorSource>;

		}

		return res;

	}

	renderMapData(mapData) {

		const renderSources = [];

		const RNLayers = this.createRNLayers(mapData.layers);

		mapData.sources.forEach((source, index) => {

			renderSources.push(
				this.getObjectSourceType(source, RNLayers[source.id], index)
			);

		});

	}

	onRegionDidChange(view) {

		if (this.props.onRegionDidChange) {

			this.props.onRegionDidChange(view);

		}

	}

	render() {

		const mapOptions = {
			...this.props.options,
			attributionEnabled: this.props.showAttribution
		};

		return (
			<MapboxGL.MapView
				{...mapOptions}
				ref={(ref) => (this.map = ref)}
				style={sheet.matchParent}
				onRegionDidChange={(view) => this.onRegionDidChange(view)}
			>

				{ this.props.mapData && this.renderMapData(this.props.mapData) }

			</MapboxGL.MapView>);

	}

}

Map.StyleURL = {
	MapboxLight: MapboxGL.StyleURL.Light,
	...StyleURL
};

Map.UserTrackingModes = { ...MapboxGL.UserTrackingModes };
Map.requestAndroidLocationPermissions = MapboxGL.requestAndroidLocationPermissions;

Map.propTypes = {
	options: PropTypes.object, //Has to be MapView options, defined in Mapbox RN docs: https://github.com/mapbox/react-native-mapbox-gl/blob/master/docs/MapView.md
	mapboxToken: PropTypes.string,
	mapData: PropTypes.object,
	showAttribution: PropTypes.bool,
	layerEvents: PropTypes.array, //Has to be Array<EventData> from flow-typed
	onRegionDidChange: PropTypes.func
};
