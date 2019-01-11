// @flow
import React from "react";
import PropTypes from "prop-types";
import Dialog, { DialogButton, DialogTitle, DialogContent } from "react-native-popup-dialog";

class AcceptDialog extends React.Component {

	constructor(props) {

		super(props);

	}

	onAcceptButtonPressed() {

		if (this.props.acceptButtonPressed) {

			this.props.acceptButtonPressed();

		}

		this.onDialogClosed();

	}

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
				actions={[
					<DialogButton
						key={1}
						text={this.props.acceptButtonText}
						onPress={() => this.onAcceptButtonPressed()}
					/>,
				]}
				dialogTitle={
					this.props.showTitle &&
						<DialogTitle title={ this.props.titleText } />
				}
			>
				<DialogContent>
					{ this.props.children }
				</DialogContent>
			</Dialog>
		);

	}

}

AcceptDialog.propTypes = {

	isModal: PropTypes.bool,
	isVisible: PropTypes.bool,
	showTitle: PropTypes.bool,
	acceptButtonText: PropTypes.string,
	titleText: PropTypes.string,
	acceptButtonPressed: PropTypes.func,
	closeDialogHandler: PropTypes.func,
	children: PropTypes.node.isRequired

};

AcceptDialog.defaultProps = {
	isModal: false,
	showTitle: true,
	acceptButtonText: "Accept",
	titleText: "",
	isVisible: true
};

export default AcceptDialog;
