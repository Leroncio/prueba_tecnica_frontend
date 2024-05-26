import React from 'react'

export const Header = () => {
  return (
    <>
        <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
            <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
                <img src="src/img/avatar.png" className="img rounded user-img" alt="user-img" />
                <nav className="flex flex-wrap items-center justify-center pl-24 text-base md:ml-auto md:mr-auto">
                    <a href="#_" className="mr-5 font-medium hover:text-gray-900" rel="noreferrer">Inicio</a>
                    <a href="https://github.com/Leroncio/prueba_tecnica_frontend" className="mr-5 font-medium hover:text-gray-900" target="_blank" rel="noreferrer">Proyecto Front-End</a>
                    <a href="https://github.com/Leroncio/prueba_tecnica_backend" className="mr-5 font-medium hover:text-gray-900" target="_blank" rel="noreferrer">Proyecto Back-End</a>
                </nav>
            </div>
        </header>
    </>
  )
}
