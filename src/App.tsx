import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {BoostBurst} from "./pages/BoostBurst";
import {BrandedBoost} from "./pages/BrandedBoost";
import {MainPage} from "./pages/Main";


const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage/>}/>
				<Route path="/boost-burst" element={<BoostBurst/>}/>
				<Route path="/branded-boost" element={<BrandedBoost/>}/>
			</Routes>
		</Router>
	)
};

export default App;
