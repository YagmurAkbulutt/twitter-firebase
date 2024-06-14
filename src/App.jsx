import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Protected from './pages/Protected'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/*public */}
      <Route path='/' element={<Login/>}/>
      <Route path='/kategori' element={<h1>kategori</h1>}/>

      {/*private */}
      <Route element={<Protected/>}>
      <Route path='/home' element={<Feed/>}/>
      <Route path='/profil' element={<h1>profil</h1>}/>
      <Route path='/ayar' element={<h1>ayar</h1>}/>
      <Route path='/arkadaşlar' element={<h1>arkadaşlar</h1>}/>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
