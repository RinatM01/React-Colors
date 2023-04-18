import styles from './index.module.css';
import Link from 'next/link';
import MiniPalette from '@/Components/MiniPalette/MiniPalette';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';
import { Button } from '@mui/material';

function Home() {
	const { palettes } = useContext(PaletteContext);

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
					{palettes.map((color) => (
						<Link
							key={color.id}
							className={styles.Linky}
							href={`/palette/${color.id}`}
						>
							<MiniPalette {...color} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
export default Home;
