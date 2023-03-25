import React, { Component } from 'react';
import styles from './ColorBox.module.css';

export default class ColorBox extends Component {
	render() {
		return (
			<div
				style={{ background: this.props.background }}
				className={styles.ColorBox}
			>
				<span>{this.props.name}</span>
				<span>more</span>
			</div>
		);
	}
}
