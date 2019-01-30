// @flow
import React from "react";
import PropTypes from "prop-types";
import Dialog, { DialogTitle, DialogContent } from "react-native-popup-dialog";

class Popup extends React.Component {

	onDialogClosed() {

		if (this.props.closeDialogHandler) {

			this.props.closeDialogHandler();

		}

	}

	onTouchOutside() {

		if (!this.props.isModal) {

			this.onDialogClosed();

		}

	}

	render() {

		return (
			<Dialog
				visible={this.props.isVisible}
				onTouchOutside={() => this.onTouchOutside()	}
				dialogTitle={
					this.props.showTitle &&
						<DialogTitle title={ this.props.titleText } />
				}
				width={this.props.width}
				height={this.props.height}
			>
				<DialogContent>
					{ this.props.children }
				</DialogContent>
			</Dialog>
		);

	}

}

Popup.propTypes = {

	isModal: PropTypes.bool,
	isVisible: PropTypes.bool,
	showTitle: PropTypes.bool,
	titleText: PropTypes.string,
	closeDialogHandler: PropTypes.func,
	children: PropTypes.node.isRequired,
	width: PropTypes.number,
	height: PropTypes.number

};

Popup.defaultProps = {
	isModal: false,
	showTitle: true,
	titleText: "",
	isVisible: true,
	width: 0.8,
	height: 0.75
};

export default Popup;
