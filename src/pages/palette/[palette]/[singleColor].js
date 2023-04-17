import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import seedColors from '../../../Components/seedColors';
import { generatePalette } from '@/colorHelper';
import ColorBox from '@/Components/ColorBox/ColorBox';
import styles from './Palette.module.css';
import stylesBox from '@/Components/ColorBox/ColorBox.module.css';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
import Link from 'next/link';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';

export default function SingleColorPalette() {
	const router = useRouter();
	const [ format, setFormat ] = useState('hex');
	const [ shades, setShades ] = useState();
	const [ palette, setPalette ] = useState();
	const { palettes } = useContext(PaletteContext);
	const changeFormat = (format) => {
		setFormat(format);
	};

	useEffect(
		() => {
			const findPalette = async () => {
				const paletteId = await router.query.palette;
				const currPalette = await palettes.find((palette) => {
					return palette.id === paletteId;
				});
				if (currPalette) {
					const shady = generateShades(
						generatePalette(currPalette),
						router.query.singleColor
					);
					setPalette(currPalette);
					setShades(shady);
				}
			};
			findPalette();
		},
		[ palettes, router.query.palette, router.query.singleColor ]
	);

	const generateShades = (pal, colId) => {
		let shades = [];
		let allColors = pal.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter((color) => color.id === colId)
			);
		}
		return shades.slice(1);
	};

	let boxes;
	if (shades) {
		boxes = shades.map((col) => (
			<ColorBox
				key={col.name}
				name={col.name}
				background={col[format]}
				showMore={false}
			/>
		));
	}

	if (!palette) {
		return <div>lol</div>;
	}

	return (
		<div className={styles.Palette}>
			<Navbar changeFormat={changeFormat} showSlider={false} />
			<div className={styles.PaletteColors}>
				{boxes}
				<div className={`${stylesBox.ColorBox} ${stylesBox.goBack}`}>
					<Link
						href={`/palette/${palette.id}`}
						className={stylesBox.CopyButton}
					>
						Go Back
					</Link>
				</div>
			</div>
			<Footer paletteName={palette.paletteName} emoji={palette.emoji} />
		</div>
	);
}
