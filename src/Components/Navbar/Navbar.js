import React, { Component } from 'react';
import Slider from 'rc-slider';
import styles from './Navbar.module.css';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.closeSnack = this.closeSnack.bind(this);
	}

	handleChange(e) {
		this.setState({ format: e.target.value, open: true }, () => {
			this.props.changeFormat(this.state.format);
		});
	}

	closeSnack() {
		this.setState({ open: false });
	}

	render() {
		const { light, changeLight, changeFormat } = this.props;
		const { format, open } = this.state;
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
				<div className={styles.SelectContainer}>
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">
							RGBA - rgba(255,255,255,1.0)
						</MenuItem>
					</Select>
				</div>
				<Snackbar
					open={open}
					autoHideDuration={3000}
					message={
						<span>Format Changed to {format.toUpperCase()}</span>
					}
					action={[
						<IconButton key={getTime()} onClick={this.closeSnack}>
							<CloseIcon />
						</IconButton>
					]}
					onClose={this.closeSnack}
				/>
			</header>
		);
	}
}
