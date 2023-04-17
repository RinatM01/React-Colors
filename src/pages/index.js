import styles from './index.module.css';
import Link from 'next/link';
import MiniPalette from '@/Components/MiniPalette/MiniPalette';
import { withStyles } from '@material-ui/styles';
import { useContext } from 'react';
import { PaletteContext } from '@/context/context';

const styles1 = {
	root: {
		backgroundColor: '#8787ce',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
		overflow: 'overlay',
		paddingBottom: '10rem'
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		marginBottom: '2rem'
	},
	nav: {
		display: 'flex',
		width: '100%',
		height: '10vh',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& h1': {
			color: 'white'
		}
	},
	palettes: {
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,30%)',
		gridGap: '5%'
	}
};

function Home(props) {
	const { classes } = props;
	const { palettes } = useContext(PaletteContext);
	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1>React Colors</h1>
					<Link href="palette/new">Create Palette</Link>
				</nav>
				<div className={classes.palettes}>
					{palettes.map((color) => (
						<Link
							key={color.id}
							className={styles.Linky}
							href={`/palette/${color.id}`}
						>
							<MiniPalette {...color} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
export default withStyles(styles1)(Home);
