import React, { Component } from 'react';
import styles from './ColorBox.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class ColorBox extends Component {
	render() {
		const { name, background } = this.props;
		return (
			<CopyToClipboard text={background}>
				<div style={{ background }} className={styles.ColorBox}>
					<div className={styles.CopyContainer}>
						<div className={styles.BoxContent}>
							<span>{name}</span>
						</div>
						<button className={styles.CopyButton}>Copy</button>
					</div>
					<span className={styles.More}>More</span>
				</div>
			</CopyToClipboard>
		);
	}
}
