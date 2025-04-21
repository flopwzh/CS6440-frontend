import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Upload from './components/Upload';
import Download from './components/Download';
import Create from './components/Create';
import Home from './components/Home';
import Search from './components/Search'

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate replace to="/Upload"/>}/>
				<Route path="/Upload" element={<Upload/>} />
				<Route path="/Download" element={<Download/>} />
        		<Route path="/Create" element={<Create/>} />
				<Route path="/Search" element={<Search/>} />
			</Routes>
		</Router>
	);
}

export default App;
