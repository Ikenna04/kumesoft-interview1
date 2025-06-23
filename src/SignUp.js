import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api/post';

const SignUp = ({ users, setUsers, setHasLoggedIn }) => {
	const [fetchError, setFetchError] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	const navigate = useNavigate();

	const handleSignUp = async e => {
		e.preventDefault();

		if (confirmedPassword === password) {
			const id = users.length
				? String(Number(users[users.length - 1].id) + 1)
				: 1;

			const newUser = {
				id,
				name: name,
				email: email,
				userName: userName,
				password: password,
			};
			try {
				const response = await api.post('/users', newUser);

				const allUsers = [...users, response.data];
				setUsers(allUsers);
				setName('');
				setEmail('');
				setUserName('');
				setPassword('');
				setConfirmedPassword('');
				setHasLoggedIn(true);
				navigate('/');
			} catch (err) {
				console.log(`Error: ${err.message}`);
				setFetchError(err.message);
			}
		} else {
			setPassword('');
			setConfirmedPassword('');
			setFetchError(`Password doesn't match`);
		}
	};

	return (
		<main className='SignUp'>
			<h2>Sign Up</h2>
			<form className='bs'>
				{fetchError ? <p className='error'>{fetchError}</p> : ''}
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='Enter a your Name'
					required
					value={name}
					onChange={e => {
						setName(e.target.value);
						setFetchError('');
					}}
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='Enter a valid Email'
					required
					value={email}
					onChange={e => {
						setEmail(e.target.value.toLowerCase());
						setFetchError('');
					}}
				/>
				<label htmlFor='userName'>Username</label>
				<input
					type='text'
					name='userName'
					id='userName'
					placeholder='Enter Username'
					required
					autoComplete='off'
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
				<label htmlFor='password'>Confirm Password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Confirm your Password'
					required
					autoComplete='off'
					value={confirmedPassword}
					onChange={e => {
						setConfirmedPassword(e.target.value);
						setFetchError('');
					}}
				/>
				<button
					type='submit'
					className='bs'
					onClick={e => handleSignUp(e)}>
					Sign Up
				</button>
			</form>
			<p>
				I have an account? <Link to='/login'>Login Here</Link>
			</p>
		</main>
	);
};

export default SignUp;
