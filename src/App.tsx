import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BoostBurst} from "./pages/boost-burst";
import {BrandedBoostConfigEditor} from "./pages/branded-boost-config";

const BASE_URL = '/sweatcoin-config-editor'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path={`${BASE_URL}/boost-burst`} element={<BoostBurst/>}/>
				<Route path={`${BASE_URL}/branded-boost-config`} element={<BrandedBoostConfigEditor/>}/>
			</Routes>
		</Router>
	)
};

export default App;
