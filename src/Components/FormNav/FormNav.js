import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';
import Link from 'next/link';
import styles from './FormNav.module.css';
import PaletteSubmitForm from '@/Components/PaletteSubmitForm';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create([ 'margin', 'width' ], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

export default function FormNav({ open, handleDrawerOpen, handleSubmit }) {
	const { palettes, setPalettes } = useContext(PaletteContext);
	const [ formOpen, setFormOpen ] = useState(false);

	return (
		<div>
			<CssBaseline />
			<AppBar elevation={0} color="default" position="fixed" open={open}>
				<Toolbar className={styles.ToolBar}>
					<div className={styles.hamb}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Create a platette
						</Typography>
					</div>

					<div className={styles.NavBtns}>
						<Button
							variant="outlined"
							onClick={() => {
								setFormOpen(true);
							}}
							className={styles.NavBtn}
						>
							Save Palette
						</Button>

						<Link href="/">
							<Button
								className={styles.NavBtn}
								variant="contained"
								color="secondary"
							>
								Go Back
							</Button>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
			<PaletteSubmitForm
				setFormOpen={setFormOpen}
				handleSubmit={handleSubmit}
				open={formOpen}
			/>
		</div>
	);
}
