import React from 'react';
import styles from './ColorBox.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

function DraggableColorBox({ color, name, removeColor }) {
	return (
		<div
			className={styles.ColorBox}
			style={{ backgroundColor: color, marginBottom: '-6.5px' }}
		>
			<div
				className={styles.BoxContent}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					color: 'rgba(0,0,0,0.5)'
				}}
			>
				<span>{name}</span>
				<DeleteIcon
					onClick={() => {
						removeColor(name);
					}}
					className={styles.delete}
				/>
			</div>
		</div>
	);
}

export default DraggableColorBox;
