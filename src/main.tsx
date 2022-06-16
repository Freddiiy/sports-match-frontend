import React, {ReactNode, useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import {jsx} from "@emotion/react";
import auth from "./auth/jwt";
import Matches from "./pages/matches";
import {ChakraProvider} from "@chakra-ui/react";
import Layout from "./components/Appshell/Layout";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
	  <ChakraProvider>
		  <AppRoutes />
	  </ChakraProvider>
  </React.StrictMode>
)

function AppRoutes() {
	const [loggedIn, setLoggedIn] = useState(auth.loggedIn);
	useEffect(() => {
		setLoggedIn(auth.loggedIn)
	}, [auth.loggedIn])

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<App/>} >
					<Route index element={<Home />} />
					<Route path={"/matches"} element={<Matches/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}