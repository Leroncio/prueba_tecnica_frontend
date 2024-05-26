import React from 'react'

export const Header = () => {
  return (
    <>
        <header class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
            <div class="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
                <img src="src/img/avatar.png" className="img rounded user-img" alt="user-img" />
                <nav class="flex flex-wrap items-center justify-center pl-24 text-base md:ml-auto md:mr-auto">
                    <a href="#_" class="mr-5 font-medium hover:text-gray-900">Inicio</a>
                    <a href="#_" class="mr-5 font-medium hover:text-gray-900">Proyecto Front-End</a>
                    <a href="#_" class="mr-5 font-medium hover:text-gray-900">Proyecto Back-End</a>
                </nav>
            </div>
        </header>
    </>
  )
}
