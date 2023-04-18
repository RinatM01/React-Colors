import 'rc-slider/assets/index.css';
import '@/styles/globals.css';
import Context from '../context/context';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
	const router = useRouter();
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={router.route}
				initial="initalState"
				animate="animateState"
				exit="exitState"
				transition={{ duration: 0.5 }}
				variants={{
					initalState: {
						opacity: 0
					},
					animateState: {
						opacity: 1
					},
					exitState: {}
				}}
			>
				<Context>
					<Component {...pageProps} />
				</Context>
			</motion.div>
		</AnimatePresence>
	);
}
