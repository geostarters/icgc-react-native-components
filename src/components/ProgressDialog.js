// @flow
import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Bubble from "./Bubble";

const styles = StyleSheet.create({
	buttonCnt: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	button: {
		flex: 0.4,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 3,
		backgroundColor: "blue",
		padding: 8,
	},
	buttonTxt: {
		color: "white",
	},
});

class ProgressDialog extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			isDownloading: true
		};

	}

	formatPercent(percentage) {

		console.log("%", percentage);
		return Math.round(percentage * 100) / 100;

	}

	getDownloadState(percentage) {

		const isDownloading = this.state.isDownloading && percentage < 100;
		const isCompleted = percentage >= 100;

		if (isDownloading) {

			return this.props.activeStatusText;

		} else if (isCompleted) {

			return this.props.completeStatusText;

		} else {

			return this.props.inactiveStatusText;

		}

	}

	onResume() {

		this.setState({
			isDownloading: true,
		});

		if (this.props.onResume) {

			this.props.onResume();

		}

	}

	onPause() {

		this.setState({
			isDownloading: false,
		});

		if (this.props.onPause) {

			this.props.onPause();

		}

	}

	onStop() {

		this.setState({
			isDownloading: false,
		});

		if (this.props.onStop) {

			this.props.onStop();

		}

	}

	render() {

		return (
			<Bubble>
				<View style={{ flex: 1 }}>
					<Text>
						{`${this.props.progressTitle}: ${this.getDownloadState(this.props.percentage)}`}
					</Text>
					<Text>{`${this.props.progressSubtext}: ${this.formatPercent(this.props.percentage)}`}</Text>

					<View style={styles.buttonCnt}>

						{ !this.state.isDownloading &&
						<TouchableOpacity onPress={() => this.onResume()}>
							<View style={styles.button}>
								<Text style={styles.buttonTxt}>{this.props.resumeButtonText}</Text>
							</View>
						</TouchableOpacity>
						}
						{ this.state.isDownloading &&
						<TouchableOpacity onPress={() => this.onPause()}>
							<View style={styles.button}>
								<Text style={styles.buttonTxt}>{this.props.pauseButtonText}</Text>
							</View>
						</TouchableOpacity>
						}

						{ this.props.showStopButton &&
						<TouchableOpacity onPress={() => this.onStop()}>
							<View style={styles.button}>
								<Text style={styles.buttonTxt}>{this.props.stopButtonText}</Text>
							</View>
						</TouchableOpacity>
						}
					</View>
				</View>
			</Bubble>
		);

	}

}

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
