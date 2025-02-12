import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PuppyList from './components/PuppyList.jsx';
import PuppyDetails from './components/PuppyDetails';
import PuppyTeam from './components/PuppyTeam.jsx';
import Teams from './components/Teams.jsx';
import NavBar from './components/NavBar.jsx';
import Registration from './components/Registration.jsx';
import Ban from './components/Ban.jsx';
import './App.css'

function App() {
  const [details, setDetails] = useState({});
  const [puppies, setPuppies] = useState([]);

  return (
    <>
      <NavBar puppies={puppies} setDetails={setDetails}/>
      <Routes>
          <Route path='/' element={<PuppyList puppies={puppies} setPuppies={setPuppies}/>}/>
          <Route path='/details/:id' element={<PuppyDetails details={details} setDetails={setDetails}/>}/>
          <Route path='/details' element={<PuppyList puppies={puppies}/>}/>
          <Route path='/team/:id' element={<PuppyTeam />} />
          <Route path='/team' element={<Teams/>} />
          <Route path='/register' element={<Registration puppies={puppies} />} />
          <Route path='/report' element={<Ban />} />
        </Routes>
        <NavBar puppies={puppies} setDetails={setDetails}/>
    </>
  )
}

export default App
