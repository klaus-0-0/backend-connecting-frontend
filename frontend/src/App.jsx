/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import {v4 as uniqueID} from 'uuid'
import Signup from "./pages/Signup"
import Fetch from './pages/Fetch';
import Signin from './pages/Signin';
import { BrowserRouter, Route, Routes} from "react-router-dom"
import ProductionApi from './pages/ProductionApi';
import MyHook from './component/MyHook';
import Dashboard from './pages/Dashboard';
import Rough from './pages/Rough';
import Send from './component/send';



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element = { <Signup />}></Route>
        <Route path='/fetch' element = { <Fetch />}></Route>
        <Route path='/signin' element = { <Signin />}></Route>
        <Route path='/product' element = { <ProductionApi />}></Route>
        <Route path='/hook' element = { <MyHook />}></Route>
        <Route path='/Dashboard' element = {<Dashboard />}> </Route>
        <Route path='/rough' element = {<Rough />}> </Route>
        <Route path='/send' element = {<Send />}> </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
