import React from 'react';
import classes from './MiniPalette.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

function MiniPalette(props) {
	const { toggleDelete, colors, paletteName, emoji, id } = props;
	return (
		<motion.div
			key={id}
			initial="initalState"
			animate="animateState"
			exit="exitState"
			transition={{ duration: 0.5 }}
			variants={{
				initalState: {
					opacity: 0
				},
				animateState: {
					opacity: 1
				},
				exitState: {
					opacity: 0
				}
			}}
		>
			<div className={classes.root}>
				<DeleteIcon
					style={{
						width: '45px',
						height: '45px'
					}}
					onClick={(e) => {
						e.preventDefault();
						toggleDelete(id);
					}}
					className={classes.deleteIcon}
				/>

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
		</motion.div>
	);
}

export default React.memo(MiniPalette);
