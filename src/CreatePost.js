import React, { useState } from 'react';
import api from './api/post';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { GrPrevious } from 'react-icons/gr';

const Post = ({ posts, setPosts }) => {
	const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');
	const [postImage, setPostImage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		const id = posts.length
			? String(Number(posts[posts.length - 1].id) + 1)
			: 1;
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const newPost = {
			id,
			title: postTitle,
			datetime,
			body: postBody,
			image: postImage,
		};
		try {
			const response = await api.post('/posts', newPost);

			const allPosts = [...posts, response.data];
			setPosts(allPosts);
			setPostTitle('');
			setPostBody('');
			setPostImage('');
			navigate('/');
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	const encodeImageFileAsURL = (e, fnx) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			fnx(reader.result);
		};
	};

	return (
		<main>
			<form>
				<label htmlFor='header'>Post Title</label>
				<input
					type='text'
					id='header'
					name='header'
					required
					value={postTitle}
					onChange={e => setPostTitle(e.target.value)}
				/>
				<label htmlFor='body'>Post Body</label>
				<input
					type='text'
					id='body'
					name='body'
					required
					value={postBody}
					onChange={e => setPostBody(e.target.value)}
				/>
				<label htmlFor='image'>Post Image</label>
				<input
					type='file'
					name='postImage'
					id='postImage'
					required
					onChange={e => encodeImageFileAsURL(e, setPostImage)}
				/>
				<button
					type='submit'
					onClick={e => handleSubmit(e)}>
					Post
				</button>
			</form>
			<button>
				<Link to='/'>
					<GrPrevious />
				</Link>
			</button>
		</main>
	);
};

export default Post;
