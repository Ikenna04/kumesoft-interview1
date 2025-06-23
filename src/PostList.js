import React from 'react';

const PostList = ({ post }) => {
	return (
		<li
			key={post.id}
			className='bs'>
			<img
				src={post.image}
				alt={post.title}
			/>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
		</li>
	);
};

export default PostList;
