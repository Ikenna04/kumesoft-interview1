import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ hasLoggedIn, setHasLoggedIn }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLogin = e => {
		e.preventDefault();
		let user = 'ikenna';
		let pass = 'ikenna';

		if (userName === user && password === pass) {
			setHasLoggedIn(false);
			navigate('/');
			console.log(hasLoggedIn, userName, password);
		}
	};

	return (
		<main>
			<h2>Login</h2>
			<form className='bs'>
				<label htmlFor='userName'> Username</label>
				<input
					type='text'
					name='userName'
					id='userName'
					placeholder='Enter Username'
					required
					value={userName}
					onChange={e => setUserName(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Enter Password'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button
					type='submit'
					onClick={e => handleLogin(e)}>
					Login
				</button>
			</form>
		</main>
	);
};

export default SignUp;
