import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import styles from './Palette.module.css';

export default class Palette extends Component {
	render() {
		const colorBoxes = this.props.colors.map((color) => (
			<ColorBox key={color} background={color.color} name={color.name} />
		));
		return (
			<div className={styles.Palette}>
				{/* Navbar goes here */}
				<div className={styles.PaletteColors}>{colorBoxes}</div>
				{/* Footer here */}
			</div>
		);
	}
}
