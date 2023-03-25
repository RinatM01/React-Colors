import Palette from '@/Palette';
import seedColors from '@/seedColors';

export default function Home() {
	return (
		<div>
			<Palette {...seedColors[5]} />
		</div>
	);
}
