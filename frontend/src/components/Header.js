import React from "react"

function Header({ children }) {
  return (
    <header className="header">
      <div className="header__logo" />
      {children}
    </header>
  )
}

export default Header;