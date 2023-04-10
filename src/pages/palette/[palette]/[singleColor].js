import React, { useState } from 'react';
import { useRouter } from 'next/router';
import seedColors from '../../../Components/seedColors';
import { generatePalette } from '@/colorHelper';
import ColorBox from '@/Components/ColorBox/ColorBox';
import styles from './Palette.module.css';
import stylesBox from '@/Components/ColorBox/ColorBox.module.css';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
import Link from 'next/link';

export default function SingleColorPalette() {
	const router = useRouter();
	const { palette, singleColor, colorId } = router.query;
	const [ format, setFormat ] = useState('hex');

	const changeFormat = (format) => {
		setFormat(format);
	};

	const currPalette = generatePalette(
		seedColors.find((paletty) => {
			return paletty.id === palette;
		})
	);

	const generateShades = (pal, id) => {
		let shades = [];
		let allColors = pal.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter((color) => color.id === id)
			);
		}
		return shades.slice(1);
	};
	const boxes = generateShades(currPalette, colorId).map((col) => (
		<ColorBox
			key={col.name}
			name={col.name}
			background={col[format]}
			showMore={false}
		/>
	));
	return (
		<div className={styles.Palette}>
			<Navbar changeFormat={changeFormat} showSlider={false} />
			<div className={styles.PaletteColors}>
				{boxes}
				<div className={`${stylesBox.ColorBox} ${stylesBox.goBack}`}>
					<Link
						href={`/palette/${currPalette.id}`}
						className={stylesBox.CopyButton}
					>
						Go Back
					</Link>
				</div>
			</div>
			<Footer
				paletteName={currPalette.paletteName}
				emoji={currPalette.emoji}
			/>
		</div>
	);
}
