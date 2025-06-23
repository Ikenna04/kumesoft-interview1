import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ users, hasLoggedIn, setHasLoggedIn }) => {
	const [fetchError, setFetchError] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLogin = e => {
		e.preventDefault();

		const thisUser = users.filter(user => user.userName === userName);

		console.log(thisUser);
		console.log(thisUser[0]);

		if (thisUser.length < 1) {
			setFetchError('user does not exist');
		} else {
			thisUser.forEach(user => {
				if (userName === user.userName && password === user.password) {
					setHasLoggedIn(true);
					navigate('/');
					console.log(hasLoggedIn);
				} else {
					setFetchError(`Invalid username or password`);
					console.log(fetchError);
				}
			});
		}
	};

	return (
		<main>
			<h2>Login</h2>
			<form className='bs'>
				{fetchError ? <p className='error'>{fetchError}</p> : ''}
				<label htmlFor='userName'>Username</label>
				<input
					type='text'
					name='userName'
					id='userName'
					placeholder='Enter Username'
					required
					value={userName}
					onChange={e => {
						setUserName(e.target.value);
						setFetchError('');
					}}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Enter Password'
					required
					autoComplete='off'
					value={password}
					onChange={e => {
						setPassword(e.target.value);
						setFetchError('');
					}}
				/>
				<button
					type='submit'
					className='bs'
					onClick={e => handleLogin(e)}>
					Login
				</button>
			</form>
			<p>
				I don't have an account? <Link to='/signup'>Register Here</Link>
			</p>
		</main>
	);
};

export default Login;
