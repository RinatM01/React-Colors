import styles from './index.module.css';
import Link from 'next/link';
import MiniPalette from '@/Components/MiniPalette/MiniPalette';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';

function Home() {
	const { palettes } = useContext(PaletteContext);

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<h1>React Colors</h1>
					<Link href="palette/new">Create Palette</Link>
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
