import { createContext, useState, useEffect } from 'react';
import seedColors from '../Components/seedColors';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const PaletteContext = createContext(null);

function Context({ children }) {
	const [ palettes, setPalettes ] = useLocalStorage('palettes', seedColors);

	return (
		<PaletteContext.Provider value={{ palettes, setPalettes }}>
			{children}
		</PaletteContext.Provider>
	);
}

export default Context;
