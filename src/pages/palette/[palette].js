import React, { useEffect, useState } from 'react';
import ColorBox from '../../Components/ColorBox/ColorBox';
import styles from './Palette.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import seedColors from '../../Components/seedColors';
import { useRouter } from 'next/router';
import { generatePalette } from '@/colorHelper';

export default function Palette() {
	const [ light, setLight ] = useState(500);
	const [ format, setFormat ] = useState('hex');
	const [ palette, setPalette ] = useState();
	const router = useRouter();

	useEffect(
		() => {
			const findPalette = async () => {
				const paletteId = await router.query.palette;
				const currPalette = await seedColors.find(function(palette) {
					return palette.id === paletteId;
				});
				if (currPalette) {
					setPalette(generatePalette(currPalette));
					console.log(generatePalette(currPalette));
				}
			};
			findPalette();
		},
		[ router.query.palette ]
	);

	const changeLight = (light) => {
		setLight(light);
	};

	const changeFormat = (format) => {
		setFormat(format);
	};

	return (
		palette && (
			<div className={styles.Palette}>
				<Navbar
					light={light}
					changeLight={changeLight}
					changeFormat={changeFormat}
				/>
				<div className={styles.PaletteColors}>
					{palette.colors[light].map((color) => (
						<ColorBox
							key={color.id}
							background={color[format]}
							name={color.name}
						/>
					))}
				</div>
				<footer className={styles.Footer}>
					{palette.paletteName}
					<span className={styles.Emoji}>{palette.emoji}</span>
				</footer>
			</div>
		)
	);
}
