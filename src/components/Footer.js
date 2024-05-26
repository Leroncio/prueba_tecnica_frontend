import React from 'react'

export const Footer = () => {
  return (
    <>
        <footer className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <hr className="my-10 border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-500">Prueba téctica para Grupo Avanza</p>
                    <div className="flex mt-3 -mx-2 sm:mt-0">
                        <p className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300">
                            Desarrollado por <a href="https://github.com/Leroncio" target="_blank" rel="noreferrer" aria-label="Github">Eduardo Araya</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
