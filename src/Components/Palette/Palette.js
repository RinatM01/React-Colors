import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import styles from './Palette.module.css';
import Navbar from '../Navbar/Navbar';

export default class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light: 500,
			format: 'hex'
		};
		this.changeLight = this.changeLight.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}

	changeLight(light) {
		this.setState({ light });
	}

	changeFormat(format) {
		this.setState({ format });
	}

	render() {
		const { colors } = this.props.palette;
		const { light, format } = this.state;
		const colorBoxes = colors[light].map((color) => (
			<ColorBox
				key={color}
				background={color[format]}
				name={color.name}
			/>
		));
		return (
			<div className={styles.Palette}>
				<Navbar
					light={light}
					changeLight={this.changeLight}
					changeFormat={this.changeFormat}
				/>
				<div className={styles.PaletteColors}>{colorBoxes}</div>
				{/* Footer here */}
			</div>
		);
	}
}
