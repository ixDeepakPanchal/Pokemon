
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import PokemonDetailPage from './components/PokemonDetailPage'
import PokemonList from './components/PokemonList'
import LoadingPage from './components/LoadingPage'
import BattlePage from './components/BattlePage'
import PokemonType from './components/PokemonType'
import AboutPage from './components/AboutPage'
function App() {
  return (
    <div className='h-svh  flex flex-col'>
      <Navbar />

      <div className='h-full overflow-hidden'>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/pokemons' element={<PokemonList />}></Route>
          <Route path='/pokemons/:id' element={<PokemonDetailPage />}></Route>
          <Route path='/battle' element={<BattlePage />}></Route>
          <Route path='/category' element={<PokemonType />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/loading' element={<LoadingPage />}></Route>
        </Routes>
        {/* */}
        {/* <PokemonList /> */}

      </div>
    </div>
  )
}

export default App
