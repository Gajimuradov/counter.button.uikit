\import { Counter } from './components/Counter/Counter'

function App() {

  return (
		<>
			<div>
				<Counter
					value={3}
					size={8}
					pulse
				/>{" "}
				<Counter
					value={5}
					size={12}
					pulse
				/>{" "}
				<Counter
					value={10}
					size={16}
					pulse
				/>{" "}
				<Counter
					value={"abc"}
					size={20}
					pulse
				/>{" "}
				<Counter
					value={110}
					size={24}
					pulse
				/>{" "}
			</div>
			<div>
				<Counter
					value={3}
					size={8}
					pulse
					variant='secondary'
				/>{" "}
				<Counter
					value={5}
					size={12}
					variant='secondary'
					pulse
				/>{" "}
				<Counter
					variant='secondary'
					value={10}
					size={16}
					pulse
				/>{" "}
				<Counter
					variant='secondary'
					value={"abc"}
					size={20}
					pulse
				/>{" "}
				<Counter
					variant='secondary'
					value={110}
					size={24}
					pulse
				/>{" "}
			</div>
			<div></div>
		</>
	);
}

export default App
