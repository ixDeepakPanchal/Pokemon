
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import pokemonStore from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <Provider store={pokemonStore}>
    <BrowserRouter><App /></BrowserRouter>

  </Provider >
)