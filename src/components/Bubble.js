//@flow

import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
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
		backgroundColor: "white",
	},
});

class Bubble extends React.PureComponent {

	render() {

		const innerChildView = this.props.children;

		return (
			<View style={[styles.container, this.props.style]}>
				{innerChildView}
			</View>
		);

	}

}

Bubble.propTypes = {
	style: PropTypes.object,
	children: PropTypes.object
};

export default Bubble;
