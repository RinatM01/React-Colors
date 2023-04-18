import styles from './index.module.css';
import Link from 'next/link';
import MiniPalette from '@/Components/MiniPalette/MiniPalette';
import { useContext, useState } from 'react';
import { PaletteContext } from '@/context/context';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence } from 'framer-motion';

function Home() {
	const { palettes, setPalettes } = useContext(PaletteContext);

	const [ open, setOpen ] = useState(false);
	const [ toBeDeleted, setToBeDeleted ] = useState('');
	const handleClose = () => {
		setOpen(false);
	};

	const toggleDelete = (id) => {
		setToBeDeleted(id);
		setOpen(true);
	};

	const handleDelete = () => {
		setPalettes(palettes.filter((pal) => pal.id !== toBeDeleted));
		setToBeDeleted('');
		setOpen(false);
	};

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<h1>React Colors</h1>
					<Link style={{ color: 'white' }} href="palette/new">
						<Button
							style={{ fontSize: '1rem' }}
							variant="contained"
							color="primary"
						>
							Create Palette
						</Button>
					</Link>
				</nav>

				<div className={styles.palettes}>
					<AnimatePresence>
						{palettes.map((color) => (
							<Link
								key={color.id}
								className={styles.Linky}
								href={`/palette/${color.id}`}
							>
								<MiniPalette
									toggleDelete={toggleDelete}
									{...color}
								/>
							</Link>
						))}
					</AnimatePresence>
				</div>
			</div>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle style={{ padding: '0.9rem 2rem' }}>
					Delete this palette?
				</DialogTitle>
				<List>
					<ListItem style={{ padding: '0' }} disableGutters>
						<ListItemButton onClick={handleDelete}>
							<ListItemAvatar>
								<Avatar
									sx={{
										bgcolor: blue[100],
										color: blue[600]
									}}
								>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItemButton>
					</ListItem>
					<ListItem style={{ padding: '0' }} disableGutters>
						<ListItemButton
							onClick={() => {
								setToBeDeleted('');
								setOpen(false);
							}}
						>
							<ListItemAvatar>
								<Avatar
									sx={{
										bgcolor: red[100],
										color: red[600]
									}}
								>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItemButton>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}
export default Home;
