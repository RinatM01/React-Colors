import React, { Component } from 'react';
import styles from './ColorBox.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
		this.changeCopyState = this.changeCopyState.bind(this);
	}
	changeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 1000);
		});
	}
	render() {
		const { name, background } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className={styles.ColorBox}>
					<div
						style={{ background }}
						className={`${styles.CopyOverlay} ${styles[
							copied && 'show'
						]}`}
					/>
					<div
						className={`${styles.CopyMsg} ${styles[
							copied && 'show'
						]}`}
					>
						<h1>Copied!</h1>
						<p>{background}</p>
					</div>
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