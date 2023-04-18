import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import DraggableList from '@/Components/DraggableList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { PaletteContext } from '@/context/context';
import { useRouter } from 'next/router';
import FormNav from '@/Components/FormNav/FormNav';
import ColorPicker from '@/Components/ColorPicker/ColorPicker';

const drawerWidth = 400;

const Main = styled('main', {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	height: '100vh',
	flexGrow: 1,
	padding: 0,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

export default function NewPaletteForm() {
	const { palettes, setPalettes } = useContext(PaletteContext);
	const router = useRouter();
	const theme = useTheme();
	const [ open, setOpen ] = React.useState(true);
	const [ color, setColor ] = useState('purple');
	const [ savedColors, setSavedColors ] = useState(palettes[0].colors);
	const [ input, setInput ] = useState('');
	const paletteFull = savedColors.length >= 20;

	useEffect(() => {
		ValidatorForm.addValidationRule('isNameUnique', (value) => {
			return savedColors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});

		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return savedColors.every(
				({ color }) => color.toLowerCase() !== value.toLowerCase()
			);
		});

		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	});

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleAddColor = (color) => {
		const newColor = {
			color: color,
			name: input
		};
		setSavedColors([ ...savedColors, newColor ]);
	};

	const handleSubmit = (name, emoji) => {
		const newPalette = {
			paletteName: name,
			emoji: emoji,
			id: name.toLowerCase().replace(/ /g, '-'),
			colors: savedColors
		};
		setPalettes([ ...palettes, newPalette ]);
		router.push('/');
	};

	const removeColor = (colorName) => {
		setSavedColors(savedColors.filter((color) => color.name !== colorName));
	};

	const addRandom = () => {
		const allColors = palettes.map((p) => p.colors).flat();
		let rando = Math.floor(Math.random() * allColors.length);
		let randColor = allColors[rando];
		console.log(randColor);
		while (savedColors.some((color) => color.name === randColor.name)) {
			rando = Math.floor(Math.random() * allColors.length);
			randColor = allColors[rando];
		}
		setSavedColors([ ...savedColors, randColor ]);
	};

	return (
		<Box sx={{ display: 'flex', boxShadow: '0' }}>
			<FormNav
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				handleSubmit={handleSubmit}
			/>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<ColorPicker
					setSavedColors={setSavedColors}
					addRandom={addRandom}
					paletteFull={paletteFull}
					color={color}
					setColor={setColor}
					handleAddColor={handleAddColor}
					input={input}
					setInput={setInput}
				/>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<DraggableList
					savedColors={savedColors}
					setSavedColors={setSavedColors}
					removeColor={removeColor}
				/>
			</Main>
		</Box>
	);
}
