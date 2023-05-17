import './App.css';
import { Route, Routes } from "react-router-dom"
import { ContextProvider } from "./Context"
import { Posts } from './views/Posts';
import { Nav } from './views/Nav';
import { Auth } from './views/Auth';
import { Create } from './views/Create';


function App() {
	return (
		<div className='App'>
			<ContextProvider>
				<Nav />

				<Routes>
					<Route path="/posts" element={<Posts />} />

					<Route path="/auth" element={<Auth />} />

					<Route path="/create" element={<Create />} />

					<Route path="/*" element={<Posts />} />
				</Routes>
			</ContextProvider>
		</div>
	)
}

export default App;