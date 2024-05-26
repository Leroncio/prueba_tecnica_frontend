import React, { useEffect,useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAll } from '../../actions/getAll';
import { createUser } from '../../actions/createUser';
import { deleteUser } from '../../actions/deleteUser';

export const Body = () => {

    let [isOpenCreate, switchModal ] = useState(false);
    const updateModal = (status) =>{
        switchModal(status);
    }
    
    const [response, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //metodo para obtener la data de todos los usuarios
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const users = await getAll();
            setIsLoading(false);
            setData(users);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //effect para la carga inicial del listado de usuarios
    useEffect(() => {
        fetchData();
    }, []);



    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    //request para crear un usuario
    const createRequest = async () => {
        try {
            const users = await createUser(fullName,email,address,birthdate);
            if(users.status === 200){ //limpiar form una vez creado el usuario
                setFullname('');
                setEmail('');
                setAddress('');
                setBirthdate('');
                updateModal(false); //cerrar form
            }
            console.log(users);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchData(); //actualizar usuarios
        }
    }

    const [deleteUuid, setDeleteUuid] = useState('');
    //Request para eliminar un usuario
    const deleteRequest = async (uuid) => {
        try {
            const response = await deleteUser(uuid);
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchData(); //actualizar usuarios
        }
    }

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
            name: 'Email',
            selector: row => row.email,
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
        { 
            name: 'Editar',
            grow: 0,
            cell: row => (
                <div className="cursor-pointer" onClick={ ()=> {
                    alert("editar form");
                }
                } >
                    ED
                </div>
            )
        },
        { 
            name: 'Borrar',
            grow: 0,
            cell: row => (
                <div className="cursor-pointer" onClick={ ()=> {
                    deleteRequest(row.uuid);
                }
                } >
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"/></svg>
                </div>
            )
        }
    ];

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
                    <div className="mt-4 sm:pr-8 table-container">
                    {isLoading ? (
                        <><p>cargando datos...</p></>
                    ) : (
                        <div className="overflow-x-auto">
                        {/*<div><pre>{JSON.stringify(response, null, 2) }</pre></div>*/}
                        <DataTable
                            columns={columns}
                            data={response}
                            noDataComponent="No existe ningún usuario"
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

        <section className={ isOpenCreate ? "" : "hidden" }>
              <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50" style={{ zIndex: 200 }}>
                <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
                  <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg p-4 text-center w-full">Crear nuevo usuario</h3>
                  </div>
                  <div className="p-8">
                  <div className="flex items-center justify-center">
                    <div className="mx-auto w-full">
                        <form>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                Nombre completo
                                </label>
                                <input
                                    value={fullName}
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Nombre completo"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email
                            </label>
                            <input
                                value={email}
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="ejemplo@email.com"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Dirección
                            </label>
                            <input
                                value={address}
                                type="text"
                                name="address"
                                onChange={(e) => setAddress(e.target.value)}
                                id="address"
                                placeholder="Av. Falsa 123"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
                                Fecha de nacimiento
                            </label>
                            <input
                                value={birthdate}
                                type="text"
                                name="birthdate"
                                onChange={(e) => setBirthdate(e.target.value)}
                                id="birthdate"
                                placeholder="Fecha de nacimiento"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div>
                        </div>
                        </form>
                        </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center w-100 border-t p-3">
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ ()=>updateModal(false) }>Cancelar</button>
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ createRequest }>Crear usuario</button>
                  </div>
                </div>
              </div>
        </section>
        </>
    )
}
