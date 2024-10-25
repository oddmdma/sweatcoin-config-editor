import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BoostBurst} from "./pages/BoostBurst";
import {BrandedBoost} from "./pages/BrandedBoost";
import {BASE_URL} from "./constants";
import {MainPage} from "./pages/Main";


const App = () => {
	return (
		<Router>
			<Routes>
				<Route path={BASE_URL} element={<MainPage/>}/>
				<Route path={`${BASE_URL}/boost-burst`} element={<BoostBurst/>}/>
				<Route path={`${BASE_URL}/branded-boost`} element={<BrandedBoost/>}/>
			</Routes>
		</Router>
	)
};

export default App;
