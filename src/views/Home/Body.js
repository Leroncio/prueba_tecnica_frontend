import React, { useEffect,useState } from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';

const columns = [
    /*
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      grow: 0
    },
    {
      name: 'UUID',
      selector: row => row.uuid,
      sortable: false
    },*/
    {
      name: 'Nombre',
      selector: row => row.fullname,
      sortable: true
    },
    {
      name: 'Dirección',
      selector: row => row.address,
      sortable: false
    },
    {
      name: 'Fecha nacimiento',
      selector: row => row.birthdate,
      sortable: true
    },
    {
      name: 'Creado',
      selector: row => row.created_at,
      sortable: true
    },
    {
      name: 'Modificado',
      selector: row => row.updated_at,
      sortable: true
    },
  ];

export const Body = () => {

    let [isOpen, switchModal ] = useState(false);

    const updateModal = (status) =>{
        switchModal(status);
    }

    const [response, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://localhost/prueba_tecnica/user/all?token=aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1')
        .then(response => {
          setData(response.data.users);
          console.log(response.data.users);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }, []);

    const paginationSpanish = {
        rowsPerPageText:'Filas por página',
        rangeSeparatorText:'de',
        selectAllRowsText:'Todos'
    }

    return (
        <>
        <div>
            <div className="relative z-20 overflow-hidden pt-12 pb-12">
                <div className="container px-4 mx-auto">
                    <div className="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6">
                        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                    <div className="justify-between sm:flex">
                    <div>
                        <h5 className="text-xl font-bold text-slate-900">Tabla de usuarios</h5>
                    </div>
                    <div className="flex-shrink-0 hidden ml-3 sm:block">
                        <div className="items-center h-full">
                            <button className="py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200" type="button" data-config-id="auto-txt-6-3" onClick={ ()=>updateModal(true) }>Crear usuario</button>  
                        </div>
                    </div>
                </div>
                    <div class="mt-4 sm:pr-8 table-container">
                    {isLoading ? (
                        <><p>cargando datos...</p></>
                    ) : (
                        <div className="overflow-x-auto">
                        {/*<div><pre>{JSON.stringify(response, null, 2) }</pre></div>*/}
                        <DataTable
                            columns={columns}
                            data={response}
                            pagination
                            paginationComponentOptions={paginationSpanish}
                            />
                        </div>
                    )}

                    </div>
                    </div>
                </div>
            </div>
        </div>

        <section className={ isOpen ? "" : "hidden" }>
              <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50" style={{ zIndex: 200 }}>
                <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
                  <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg p-4 text-center w-full">titutlo</h3>
                  </div>
                  <div className="p-8">
                    <p>asistencia</p>
                  </div>
                  <div className="flex justify-end items-center w-100 border-t p-3">
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ ()=>updateModal(false) }>ok...</button>
                  </div>
                </div>
              </div>
        </section>
        </>
    )
}
