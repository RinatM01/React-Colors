import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import styles from './Palette.module.css';
import Navbar from '../Navbar/Navbar';

export default class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light: 500
		};
		this.changeLight = this.changeLight.bind(this);
	}
	changeLight(light) {
		this.setState({ light });
	}
	render() {
		const { colors } = this.props.palette;
		const { light } = this.state;
		const colorBoxes = colors[light].map((color) => (
			<ColorBox key={color} background={color.hex} name={color.name} />
		));
		return (
			<div className={styles.Palette}>
				<Navbar light={light} changeLight={this.changeLight} />
				<div className={styles.PaletteColors}>{colorBoxes}</div>
				{/* Footer here */}
			</div>
		);
	}
}
