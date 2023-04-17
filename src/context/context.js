import { createContext, useState } from 'react';
import seedColors from '../Components/seedColors';

export const PaletteContext = createContext(null);

function Context({ children }) {
	const [ palettes, setPalettes ] = useState(seedColors);

	return (
		<PaletteContext.Provider value={{ palettes, setPalettes }}>
			{children}
		</PaletteContext.Provider>
	);
}

export default Context;
