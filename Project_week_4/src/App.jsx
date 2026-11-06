import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Champions from './pages/Champions.jsx'
import ChampionDetails from './pages/ChampionDetails.jsx'

import './App.css'


function App()
{

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Champions />}
        />


        <Route
          path="/champion/:id"
          element={<ChampionDetails />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;