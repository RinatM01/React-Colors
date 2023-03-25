import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import styles from './Palette.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
				<Slider
					defaultValue={light}
					min={100}
					max={900}
					onChange={this.changeLight}
					step={100}
				/>
				{/* Navbar goes here */}
				<div className={styles.PaletteColors}>{colorBoxes}</div>
				{/* Footer here */}
			</div>
		);
	}
}
