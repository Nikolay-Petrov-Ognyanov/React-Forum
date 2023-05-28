import './App.css';
import { Route, Routes } from "react-router-dom"
import { ContextProvider } from "./Context"
import { Posts } from './views/Posts';
import { Nav } from './views/Nav';
import { Auth } from './views/Auth';
import { Create } from './views/Create';
import { Details } from './views/Details';
import { Profile } from './views/Profile';
import { Update } from './views/Update';
import { Comment, Reply } from './views/Reply';


export default function App() {
	return (<div className='App'>
		<ContextProvider>
			<Nav />

			<Routes>
				<Route path="/posts" element={<Posts />} />
				<Route path="posts/:postId" element={<Details />} />
				<Route path="posts/:postId/update" element={<Update />} />
				<Route path="posts/:postId/reply" element={<Reply />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/create" element={<Create />} />
				<Route path="profile/:userId" element={<Profile />} />
				<Route path="/*" element={<Posts />} />
			</Routes>
		</ContextProvider>
	</div>)
}