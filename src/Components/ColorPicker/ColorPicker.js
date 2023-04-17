import React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import dynamic from 'next/dynamic';
import styles from './ColorPicker.module.css';

const ChromePicker = dynamic(
	() => import('react-color').then((mod) => mod.ChromePicker),
	{ ssr: false }
);

export default function ColorPicker({
	setSavedColors,
	addRandom,
	paletteFull,
	color,
	setColor,
	handleAddColor,
	input,
	setInput
}) {
	return (
		<div className={styles.Container}>
			<Typography variant="h4" gutterBottom>
				Desing Your Palette
			</Typography>
			<div className={styles.btns}>
				<Button
					onClick={() => {
						setSavedColors([]);
					}}
					variant="contained"
					color="secondary"
					className={styles.btn}
				>
					Clear Palette
				</Button>
				<Button
					onClick={addRandom}
					variant="contained"
					color="primary"
					disabled={paletteFull}
					className={styles.btn}
				>
					{paletteFull ? 'Full' : 'Random Color'}
				</Button>
			</div>
			<ChromePicker
				color={color}
				onChange={(newColor) => {
					setColor(newColor.hex);
				}}
				className={styles.picker}
			/>
			<ValidatorForm
				onSubmit={() => {
					handleAddColor(color);
				}}
				className={styles.FormContainer}
			>
				<TextValidator
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					className={styles.Form}
					variant="filled"
					margin="normal"
					validators={[ 'required', 'isNameUnique', 'isColorUnique' ]}
					errorMessages={[
						'this field is required',
						'color name is not unique',
						'color is not unique'
					]}
					disabled={paletteFull}
					label="Color Name"
				/>
				<Button
					variant="contained"
					color="primary"
					style={{
						backgroundColor: !paletteFull ? color : 'grey'
					}}
					type="submit"
					disabled={paletteFull}
					className={styles.addColor}
				>
					{paletteFull ? 'Full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}
