import Palette from './palette/[palette]';
import seedColors from './palette/seedColors';
import { generatePalette } from '@/colorHelper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Home() {
	return (
		// <BrowserRouter>
		// 	<Switch>
		// 		<Route
		// 			exact
		// 			path="/"
		// 			render={() => <h1>Pallete List is here</h1>}
		// 		/>
		// 		<Route
		// 			exact
		// 			path="/palette/:id"
		// 			render={() => <h1>Individual Palette</h1>}
		// 		/>
		// 	</Switch>
		// </BrowserRouter>
		<div>
			<Palette palette={generatePalette(seedColors[5])} />
		</div>
	);
}
