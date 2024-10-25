import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BoostBurst} from "./pages/boost-burst";
import {BrandedBoost} from "./pages/branded-boost";

const BASE_URL = '/sweatcoin-config-editor'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path={`${BASE_URL}/boost-burst`} element={<BoostBurst/>}/>
				<Route path={`${BASE_URL}/branded-boost`} element={<BrandedBoost/>}/>
			</Routes>
		</Router>
	)
};

export default App;
