import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const Post = ({ posts }) => {
	let currentYear = new Date();

	return (
		<>
			<nav>
				<h1>my posts</h1>
				<button className='bs'>
					<Link to='/create'>Add New Post</Link>
				</button>
			</nav>
			<main className='Posts'>
				<h2>welcome</h2>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
					necessitatibus, illum velit, veniam reiciendis sed exercitationem
					possimus est eum commodi magni! Corrupti alias amet enim debitis quia
					tempore deleniti aspernatur?
				</p>
				{posts.length ? (
					<ul className='posts-grid'>
						{posts.map(post => {
							return <PostList post={post} />;
						})}
					</ul>
				) : (
					''
				)}
			</main>
			<footer>ezeorahikenna &copy;{currentYear.getFullYear()} </footer>
		</>
	);
};

export default Post;
