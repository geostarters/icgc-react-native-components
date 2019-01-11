// @flow
import React from "react";
import PropTypes from "prop-types";
import Dialog, { DialogButton, DialogTitle, DialogContent } from "react-native-popup-dialog";

class QuestionDialog extends React.Component {

	constructor(props) {

		super(props);

	}

	onAcceptButtonPressed() {

		if (this.props.acceptButtonPressed) {

			this.props.acceptButtonPressed();

		}

		this.onDialogClosed();

	}

	onCancelButtonPressed() {

		if (this.props.cancelButtonPressed) {

			this.props.cancelButtonPressed();

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
						text={this.props.cancelButtonText}
						onPress={() => this.onCancelButtonPressed()}
					/>,
					<DialogButton
						key={2}
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

QuestionDialog.propTypes = {

	isModal: PropTypes.bool,
	isVisible: PropTypes.bool,
	showTitle: PropTypes.bool,
	acceptButtonText: PropTypes.string,
	cancelButtonText: PropTypes.string,
	titleText: PropTypes.string,
	acceptButtonPressed: PropTypes.func,
	cancelButtonPressed: PropTypes.func,
	closeDialogHandler: PropTypes.func,
	children: PropTypes.node.isRequired

};

QuestionDialog.defaultProps = {
	isModal: false,
	isVisible: true,
	showTitle: true,
	acceptButtonText: "Accept",
	cancelButtonText: "Cancel",
	titleText: ""
};

export default QuestionDialog;
