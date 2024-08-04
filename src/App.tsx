import { useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import Homepage from './pages/Homepage/Homepage'

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="flex w-full h-screen justify-center bg-gradient-to-br from-pokemon-dark-yellow to-pokemon-dark-red">
      {isLoggedIn ? <Homepage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
    </div>
  )
}

export default App
