import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './FormNav/FormNav.module.css';
import { PaletteContext } from '@/context/context';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function PaletteSubmitForm({ handleSubmit, setFormOpen, open }) {
	const [ name, setName ] = useState('');
	const { palettes, setPalettes } = useContext(PaletteContext);
	const [ stage, setStage ] = useState('form');

	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	});

	const handleClose = () => {
		setFormOpen(false);
	};

	const showEmojis = () => {
		setStage('emoji');
	};

	return (
		<div>
			<Dialog open={open && stage == 'emoji'}>
				<Picker
					theme="light"
					data={data}
					onEmojiSelect={(emoji) => {
						handleSubmit(name, emoji.native);
					}}
				/>
			</Dialog>
			<Dialog open={open && stage == 'form'} onClose={handleClose}>
				<DialogTitle>Name your Palette</DialogTitle>
				<ValidatorForm
					className={styles.Form}
					onSubmit={() => {
						setStage('emoji');
					}}
				>
					<DialogContent>
						<DialogContentText>
							Please choose a unique name for your beautiful
							palette!
						</DialogContentText>
						<TextValidator
							variant="filled"
							fullWidth
							margin="normal"
							label="Name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[
								'this field is required',
								'the palette name already exists'
							]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Save
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
}
