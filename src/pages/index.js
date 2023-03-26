import Palette from './palette/[palette]';
import seedColors from './palette/seedColors';
import { generatePalette } from '@/colorHelper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './index.module.css';
import Link from 'next/link';

export default function Home() {
	return (
		<div className={styles.Main}>
			<h1>Palette List</h1>
			{seedColors.map((color) => (
				<Link className={styles.Linky} href={`/palette/${color.id}`}>
					{color.paletteName}
				</Link>
			))}
		</div>
	);
}
