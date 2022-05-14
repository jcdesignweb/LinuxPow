
import './App.css';

import store from '@/redux/store';
import { Component, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import SplashComponent from './pages/splash';
import MainComponent from './pages/main';
import MainService from './services/main.service';
import M from 'materialize-css'

import { Provider } from 'react-redux';

function App() {

	useEffect(() => {
		M.AutoInit()
	}, []);


	return (

		<div className="App">
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path="/splash" element={<SplashComponent />} />

						<Route path="/" element={

							<MainComponent />} />
					</Routes>

				</Router>
			</Provider>

			<footer className="page-footer">
				<div className="container">

				</div>
			</footer>

		</div>

	);
}

export default App;
