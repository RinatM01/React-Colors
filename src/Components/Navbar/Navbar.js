import React, { Component } from 'react';
import Slider from 'rc-slider';
import styles from './Navbar.module.css';

export default class Navbar extends Component {
	render() {
		const { light, changeLight } = this.props;
		return (
			<header className={styles.Navbar}>
				<div className={styles.Logo}>
					<a href="#">reactcolors</a>
				</div>
				<div className={styles.SliderCont}>
					<span>Level: {light}</span>
					<div className={styles.Slider}>
						<Slider
							defaultValue={light}
							min={100}
							max={900}
							onChange={changeLight}
							step={100}
						/>
					</div>
				</div>
			</header>
		);
	}
}
