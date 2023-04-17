import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		backgroundColor: 'white',
		borderRadius: '5px',
		padding: '0.5rem',
		position: 'relative',
		overflow: 'hidden',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	colors: {
		height: '160px',
		backgroundColor: 'grey',
		borderRadius: '5px',
		overflow: 'hidden',
		width: '100%',
		display: 'grid',
		boxSizing: 'border-box',
		gridTemplateColumns: 'repeat(5,20%)',
		'& div': {}
	},
	boxy: {
		height: '40px'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0',
		color: 'black',
		paddingTop: '0.5rem',
		fontSize: '1rem',
		position: 'relative'
	},
	emoji: {
		marginLeft: '0.5rem',
		fontSize: '1.5rem'
	}
};

function MiniPalette(props) {
	const { classes, colors, paletteName, emoji } = props;
	return (
		<div className={classes.root}>
			<div className={classes.colors}>
				{colors.map((col) => (
					<div
						key={col.name}
						style={{ backgroundColor: col.color }}
						className={classes.boxy}
					/>
				))}
			</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
