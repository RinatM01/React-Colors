import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ paletteName, emoji }) {
	return (
		<footer className={styles.Footer}>
			{paletteName}
			<span className={styles.Emoji}>{emoji}</span>
		</footer>
	);
}
