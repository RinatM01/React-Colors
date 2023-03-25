import Palette from '../Components/Palette/Palette';
import seedColors from '../Components/Palette/seedColors';

export default function Home() {
	return (
		<div>
			<Palette {...seedColors[5]} />
		</div>
	);
}
