import React, { Component } from 'react';
import styles from './ColorBox.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import chroma from 'chroma-js';

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
		const { paletteId, colorId, name, background, showMore } = this.props;
		const { copied } = this.state;
		const isDark = chroma(background).luminance() <= 0.09;
		const isLight = chroma(background).luminance() >= 0.73;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div
					style={{ background }}
					className={`${styles.ColorBox} ${!showMore
						? styles.singleMode
						: undefined}`}
				>
					<div
						style={{ background }}
						className={`${styles.CopyOverlay} ${styles[
							copied ? 'show' : undefined
						]}`}
					/>
					<div
						className={`${styles.CopyMsg} ${styles[
							copied ? 'show' : undefined
						]}`}
					>
						<h1 className={isLight ? styles.MoreDark : undefined}>
							Copied!
						</h1>
						<p className={isLight ? styles.MoreDark : undefined}>
							{background}
						</p>
					</div>
					<div className={styles.CopyContainer}>
						<div className={styles.BoxContent}>
							<span
								className={`${isDark
									? styles.TextLight
									: undefined}`}
							>
								{name}
							</span>
						</div>
						<button
							className={`${styles.CopyButton} ${isLight
								? styles.MoreDark
								: undefined}`}
						>
							Copy
						</button>
					</div>
					{showMore && (
						<Link
							href={{
								pathname: `/palette/${paletteId}/${colorId}`
							}}
							onClick={(e) => e.stopPropagation()}
						>
							<span
								className={`${styles.More} ${isLight
									? styles.MoreDark
									: undefined}`}
							>
								More
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}
