var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Bubble from "./Bubble";

var styles = StyleSheet.create({
	buttonCnt: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	button: {
		flex: 0.4,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 3,
		backgroundColor: "blue",
		padding: 8
	},
	buttonTxt: {
		color: "white"
	}
});

var ProgressDialog = function (_React$Component) {
	_inherits(ProgressDialog, _React$Component);

	function ProgressDialog(props) {
		_classCallCheck(this, ProgressDialog);

		var _this = _possibleConstructorReturn(this, (ProgressDialog.__proto__ || Object.getPrototypeOf(ProgressDialog)).call(this, props));

		_this.state = {
			isDownloading: true
		};

		return _this;
	}

	_createClass(ProgressDialog, [{
		key: "formatPercent",
		value: function formatPercent(percentage) {

			console.log("%", percentage);
			return Math.round(percentage * 100) / 100;
		}
	}, {
		key: "getDownloadState",
		value: function getDownloadState(percentage) {

			var isDownloading = this.state.isDownloading && percentage < 100;
			var isCompleted = percentage >= 100;

			if (isDownloading) {

				return this.props.activeStatusText;
			} else if (isCompleted) {

				return this.props.completeStatusText;
			} else {

				return this.props.inactiveStatusText;
			}
		}
	}, {
		key: "onResume",
		value: function onResume() {

			this.setState({
				isDownloading: true
			});

			if (this.props.onResume) {

				this.props.onResume();
			}
		}
	}, {
		key: "onPause",
		value: function onPause() {

			this.setState({
				isDownloading: false
			});

			if (this.props.onPause) {

				this.props.onPause();
			}
		}
	}, {
		key: "onStop",
		value: function onStop() {

			this.setState({
				isDownloading: false
			});

			if (this.props.onStop) {

				this.props.onStop();
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				Bubble,
				null,
				React.createElement(
					View,
					{ style: { flex: 1 } },
					React.createElement(
						Text,
						null,
						this.props.progressTitle + ": " + this.getDownloadState(this.props.percentage)
					),
					React.createElement(
						Text,
						null,
						this.props.progressSubtext + ": " + this.formatPercent(this.props.percentage)
					),
					React.createElement(
						View,
						{ style: styles.buttonCnt },
						!this.state.isDownloading && React.createElement(
							TouchableOpacity,
							{ onPress: function onPress() {
									return _this2.onResume();
								} },
							React.createElement(
								View,
								{ style: styles.button },
								React.createElement(
									Text,
									{ style: styles.buttonTxt },
									this.props.resumeButtonText
								)
							)
						),
						this.state.isDownloading && React.createElement(
							TouchableOpacity,
							{ onPress: function onPress() {
									return _this2.onPause();
								} },
							React.createElement(
								View,
								{ style: styles.button },
								React.createElement(
									Text,
									{ style: styles.buttonTxt },
									this.props.pauseButtonText
								)
							)
						),
						this.props.showStopButton && React.createElement(
							TouchableOpacity,
							{ onPress: function onPress() {
									return _this2.onStop();
								} },
							React.createElement(
								View,
								{ style: styles.button },
								React.createElement(
									Text,
									{ style: styles.buttonTxt },
									this.props.stopButtonText
								)
							)
						)
					)
				)
			);
		}
	}]);

	return ProgressDialog;
}(React.Component);

ProgressDialog.propTypes = {
	progressTitle: PropTypes.string,
	progressSubtext: PropTypes.string,
	resumeButtonText: PropTypes.string,
	pauseButtonText: PropTypes.string,
	stopButtonText: PropTypes.string,
	activeStatusText: PropTypes.string,
	inactiveStatusText: PropTypes.string,
	completeStatusText: PropTypes.string,
	showStopButton: PropTypes.bool,
	percentage: PropTypes.number,
	onPause: PropTypes.func,
	onResume: PropTypes.func,
	onStop: PropTypes.func
};

ProgressDialog.defaultProps = {
	progressTitle: "Status",
	progressSubtext: "Percentage",
	resumeButtonText: "Resume",
	pauseButtonText: "Pause",
	stopButtonText: "Stop",
	activeStatusText: "Active",
	inactiveStatusText: "Inactive",
	completeStatusText: "Complete",
	showStopButton: false
};

export default ProgressDialog;