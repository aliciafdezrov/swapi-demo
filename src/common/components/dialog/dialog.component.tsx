import ReactDOM from 'react-dom';
import * as React from "react";
import classes from "./dialog.component.styles.scss"
import { Button } from "../button/button.component";

interface Props {
	isOpen: boolean,
	onHide: () => void,
	header: string,
	message: string,
}

export const Dialog = (props: Props) => {
	const {isOpen, onHide, header, message} = props;

	return (
		isOpen ? ReactDOM.createPortal(
			<div className={classes.dialogOverlay}>
				<div id={"message-dialog"} className={classes.dialog} aria-modal aria-hidden role="dialog">
					<div className={classes.dialogHeader}>
						<h3>{header}</h3>
						<div className={classes.message}>
							<label aria-label="detail-message">{message}</label>
						</div>
					</div>
					<div className={classes.dialogAction}>
						<Button id={"hide-dialog-button"} onClick={onHide}>OK</Button>
					</div>
				</div>
			</div>, document.body) : null
	)
}