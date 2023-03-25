import Palette from '../Components/Palette/Palette';
import seedColors from '../Components/Palette/seedColors';
import { generatePalette } from '@/colorHelper';

export default function Home() {
	return (
		<div>
			<Palette palette={generatePalette(seedColors[5])} />
		</div>
	);
}
