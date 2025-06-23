import { Route, Routes, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import Login from './SignUp';
import './index.css';
import Post from './Post';
import api from './api/post';
import { useEffect, useState } from 'react';

function App() {
	const [posts, setPosts] = useState([]);
	const [hasLoggedIn, setHasLoggedIn] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (hasLoggedIn) {
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

		fetchPosts();
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/login'
					element={
						<Login
							hasLoggedIn={hasLoggedIn}
							setHasLoggedIn={setHasLoggedIn}
						/>
					}
				/>
				<Route
					index
					element={<Post posts={posts} />}
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
