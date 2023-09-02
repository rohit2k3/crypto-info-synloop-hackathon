import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import logo from '../assets/logo.svg'
import { AiOutlineMenu } from 'react-icons/ai';
const Header = () => {
  const [ToggleMenu, setToggleMenu] = useState(false)
  return (
    <nav>
      <AiOutlineMenu onClick={() => setToggleMenu(!ToggleMenu)} className="menu-open-icon" />
      <img className='logo' src={logo} alt="" />
      <div className={ToggleMenu ? "navlink-expanded navlinks" : "navlinks"}>
        <Link onClick={() => setToggleMenu(!ToggleMenu)} to={"/"}>Home</Link >
        <Link onClick={() => setToggleMenu(!ToggleMenu)} to={"/exchanges"}>Exchanges</Link >
        <Link onClick={() => setToggleMenu(!ToggleMenu)} to={"/coins"}>Coins</Link >
      </div>

    </nav>
  )
}

export default Header