import React, {memo} from 'react';
import classes from "./button.component.styles.scss"

interface Props {
	id: string;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Button: React.FC<Props> = memo((props) => {
	const {id, children, onClick} = props;

	return (
		<button id={id} onClick={onClick}
						className={classes.button}>
			{children}
		</button>
	);
});