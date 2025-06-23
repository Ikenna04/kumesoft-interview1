import { Route, Routes, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import Login from './Login';
import './index.css';
import Post from './Post';
import api from './api/post';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';

function App() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [hasLoggedIn, setHasLoggedIn] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!hasLoggedIn) {
			navigate('/login');
		} else {
			navigate('/');
		}

		const fetchPosts = async () => {
			try {
				const response = await api.get('/posts');
				setPosts(response.data);
				console.log(posts);
			} catch (err) {
				console.log(`Error: ${err.message}`);
			}
		};

		const fetchUsers = async () => {
			try {
				const response = await api.get('/users');
				setUsers(response.data);
				console.log(users);
			} catch (err) {
				console.log(`Error: ${err.message}`);
			}
		};

		fetchPosts();
		fetchUsers();
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route
					index
					element={<Post posts={posts} />}
				/>
				<Route
					path='/login'
					element={
						<Login
							users={users}
							hasLoggedIn={hasLoggedIn}
							setHasLoggedIn={setHasLoggedIn}
						/>
					}
				/>
				<Route
					path='/signup'
					element={
						<SignUp
							users={users}
							setUsers={setUsers}
							hasLoggedIn={hasLoggedIn}
							setHasLoggedIn={setHasLoggedIn}
						/>
					}
				/>
				<Route
					element={
						<CreatePost
							posts={posts}
							setPosts={setPosts}
						/>
					}
					path='/create'
				/>
			</Routes>
		</div>
	);
}

export default App;
