import { useState, useEffect, useRef } from 'react';
export function useLocalStorage(key, fallbackValue) {
	const [ value, setValue ] = useState(fallbackValue);
	const initialRender = useRef(true);
	useEffect(
		() => {
			const stored = localStorage.getItem(key);
			setValue(stored ? JSON.parse(stored) : fallbackValue);
		},
		[ fallbackValue, key ]
	);

	useEffect(
		() => {
			if (initialRender.current) {
				initialRender.current = false;
				return;
			}
			localStorage.setItem(key, JSON.stringify(value));
		},
		[ key, value ]
	);

	return [ value, setValue ];
}
