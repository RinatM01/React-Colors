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

export default function SingleColorPalette() {
	const router = useRouter();
	// const { paletteId, colorId } = router.query;
	const [ format, setFormat ] = useState('hex');
	const [ shades, setShades ] = useState();
	const [ paletteId, setPaletteId ] = useState();

	const changeFormat = (format) => {
		setFormat(format);
	};

	// const currPalette = generatePalette(
	// 	seedColors.find((paletty) => {
	// 		return paletty.id === paletteId;
	// 	})
	// );

	useEffect(
		() => {
			const findPalette = async () => {
				const paletteId = await router.query.palette;
				const currPalette = await seedColors.find((palette) => {
					return palette.id === paletteId;
				});
				if (currPalette) {
					const shady = generateShades(
						generatePalette(currPalette),
						router.query.singleColor
					);
					setPaletteId(currPalette.id);
					setShades(shady);
				}
			};
			findPalette();
		},
		[ router.query.palette, router.query.singleColor ]
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

	return (
		<div className={styles.Palette}>
			<Navbar changeFormat={changeFormat} showSlider={false} />
			<div className={styles.PaletteColors}>
				{boxes}
				<div className={`${stylesBox.ColorBox} ${stylesBox.goBack}`}>
					<Link
						href={`/palette/${paletteId}`}
						className={stylesBox.CopyButton}
					>
						Go Back
					</Link>
				</div>
			</div>
			{/* <Footer
				paletteName={currPalette.paletteName}
				emoji={currPalette.emoji}
			/> */}
		</div>
	);
}
