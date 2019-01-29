var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import Dialog, { DialogTitle, DialogContent } from "react-native-popup-dialog";

var Popup = function (_React$Component) {
	_inherits(Popup, _React$Component);

	function Popup() {
		_classCallCheck(this, Popup);

		return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
	}

	_createClass(Popup, [{
		key: "onDialogClosed",
		value: function onDialogClosed() {

			if (this.props.closeDialogHandler) {

				this.props.closeDialogHandler();
			}
		}
	}, {
		key: "onTouchOutside",
		value: function onTouchOutside() {

			if (!this.props.isModal) {

				this.onDialogClosed();
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				Dialog,
				{
					visible: this.props.isVisible,
					onTouchOutside: function onTouchOutside() {
						return _this2.onTouchOutside();
					},
					dialogTitle: this.props.showTitle && React.createElement(DialogTitle, { title: this.props.titleText }),
					width: this.props.width
				},
				React.createElement(
					DialogContent,
					null,
					this.props.children
				)
			);
		}
	}]);

	return Popup;
}(React.Component);

Popup.propTypes = {

	isModal: PropTypes.bool,
	isVisible: PropTypes.bool,
	showTitle: PropTypes.bool,
	titleText: PropTypes.string,
	closeDialogHandler: PropTypes.func,
	children: PropTypes.node.isRequired,
	width: PropTypes.number

};

Popup.defaultProps = {
	isModal: false,
	showTitle: true,
	titleText: "",
	isVisible: true,
	width: 0.8
};

export default Popup;