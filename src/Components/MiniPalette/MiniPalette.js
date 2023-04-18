import React from 'react';
import classes from './MiniPalette.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';

function MiniPalette(props) {
	const { colors, paletteName, emoji, id } = props;
	const { palettes, setPalettes } = useContext(PaletteContext);

	const handleDelete = (e) => {
		e.preventDefault();
		setPalettes(palettes.filter((pal) => pal.id !== id));
	};

	return (
		<div className={classes.root}>
			<DeleteIcon onClick={handleDelete} className={classes.deleteIcon} />

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

export default MiniPalette;
