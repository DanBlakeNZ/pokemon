import { useEffect, useState } from 'react'
import { userDetailsType } from '../../pages/LoginPage/LoginPage'
import logo from '../../assets/Pokemon_logo.svg'
import pikacheu from '../../assets/pikacheu.png'

function Header() {
  const [localUserName, setLocalUserName] = useState('Guest')

  // On first load
  useEffect(() => {
    // Get user details (could be moved to homepage if needed elsewhere)
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      const localUser: userDetailsType = JSON.parse(userDetails)
      setLocalUserName(localUser.userName)
    }
  }, [])

  return (
    <div className="w-full h-40 bg-white rounded-md p-5 mt-5 flex flex-col items-center justify-center relative drop-shadow-lg border-4 border-pokemon-dark-blue">
      <img src={logo} alt="pokemon logo" className="w-1/4 h-20 mb-3" />
      <img src={pikacheu} alt="pikacheu" className="h-full absolute right-0" />
      <h1 className="text-3xl text-pokemon-dark-blue font-PokemonSolid tracking-widest antialiased">
        Welcome {localUserName}
      </h1>
    </div>
  )
}

export default Header
