import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Upload from './components/Upload';
import Download from './components/Download';
import Create from './components/Create';
import Home from './components/Home';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/Upload" element={<Upload/>} />
				<Route path="/Download" element={<Download/>} />
        		<Route path="/Create" element={<Create/>} />
			</Routes>
		</Router>
    // <div>
    //   <ImageUpload/>
    // </div>
	);
}

export default App;
