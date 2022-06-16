import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import auth from "./auth/jwt";
import Login from "./components/Login";
import Layout from "./components/Appshell/Layout";
import {Outlet} from "react-router";

function App() {
  return (
	  <Layout>
	  	{ auth.loggedIn() ? <Outlet /> : <Login /> }
	  </Layout>
  )
}

export default App
