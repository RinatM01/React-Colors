import React from 'react';
import DraggableColorBox from './ColorBox/DraggableColorBox';
import { ReactSortable } from 'react-sortablejs';

function DraggableList({ savedColors, setSavedColors, removeColor }) {
	return (
		<ReactSortable
			tag="div"
			list={savedColors}
			setList={setSavedColors}
			style={{ height: '92.62%' }}
		>
			{savedColors.map((color, i) => (
				<DraggableColorBox
					index={i}
					key={color.name}
					color={color.color}
					name={color.name}
					removeColor={removeColor}
				/>
			))}
		</ReactSortable>
	);
}

export default DraggableList;
