var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

var styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		position: "absolute",
		bottom: 16,
		left: 48,
		right: 48,
		paddingVertical: 16,
		minHeight: 60,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white"
	}
});

var Bubble = function (_React$PureComponent) {
	_inherits(Bubble, _React$PureComponent);

	function Bubble() {
		_classCallCheck(this, Bubble);

		return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).apply(this, arguments));
	}

	_createClass(Bubble, [{
		key: "render",
		value: function render() {

			var innerChildView = this.props.children;

			return React.createElement(
				View,
				{ style: [styles.container, this.props.style] },
				innerChildView
			);
		}
	}]);

	return Bubble;
}(React.PureComponent);

Bubble.propTypes = {
	style: PropTypes.object,
	children: PropTypes.object
};

export default Bubble;