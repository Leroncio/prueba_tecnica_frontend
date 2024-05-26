import React, { useEffect,useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAll } from '../../actions/getAll';
import { createUser } from '../../actions/createUser';
import { deleteUser } from '../../actions/deleteUser';
import { updateUser } from '../../actions/updateUser';
import DatePicker from 'react-date-picker';

export const Body = () => {

    let [isOpenCreate, switchCreateModal ] = useState(false);
    const createModal = (status) =>{
        switchCreateModal(status);
    }

    let [isOpenUpdate, switchUpdateModal ] = useState(false);
    const updateModal = (status) =>{
        switchUpdateModal(status);
    }

    let [isOpenConfirmation, switchConfirmationModal ] = useState(false);
    const confirmationModal = (status) =>{
        switchConfirmationModal(status);
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


    //Variables necesarias para el form de crear usuario
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(''); //manejo de control de email
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    };

    //request para crear un usuario
    const createRequest = async () => {
        try {
            if(validateEmail(email)){
                setEmailError('');
                const users = await createUser(fullName,email,address,birthdate);
                if(users.status === 200){ //limpiar form una vez creado el usuario
                    setFullname('');
                    setEmail('');
                    setAddress('');
                    setBirthdate('');
                    createModal(false); //cerrar form
                    fetchData(); //actualizar usuarios
                }else{ //Mostrar mensajes de error
                    if(users.response.data.status === 400){
                        setEmailError('*'+users.response.data.developerMessage);
                    }else{
                        console.log(users)
                    }
                }
            }else{
                setEmailError('*Ingrese un email valido');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //Variables para editar
    const [confirmationUuid, setConfirmationUuid] = useState('');
    const [confirmationEmail, setConfirmationEmail] = useState('');
    //Request para eliminar un usuario
    const deleteRequest = async () => {
        try {
            const response = await deleteUser(confirmationUuid);
            confirmationModal(false);
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchData(); //actualizar usuarios
        }
    }

    //Variables para editar
    const [updateUuid, setUpdateUuid] = useState('');
    const [updateFullName, setUpdateFullname] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [emailUpdateError, setEmailUpdateError] = useState(''); //manejo de control de email
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateBirthdate, setUpdateBirthdate] = useState('');

    const updateRequest = async () => {
        try {
            if(validateEmail(updateEmail)){
                setEmailUpdateError('');
                const response = await updateUser(updateUuid,updateFullName,updateEmail,updateAddress,updateBirthdate);
                if(response.status === 200){ //limpiar form una vez actualizado el usuario
                    setUpdateUuid('');
                    setUpdateFullname('');
                    setUpdateEmail('');
                    setUpdateAddress('');
                    setUpdateBirthdate('');
                    updateModal(false); //cerrar form
                    fetchData(); //actualizar usuarios
                }else{ //Mostrar mensajes de error
                    if(response.response.data.status === 400){
                        setEmailUpdateError('*'+response.response.data.developerMessage);
                    }else{
                        console.log(response)
                    }
                }
            }else{
                setEmailUpdateError('*Ingrese un email valido');
            }
        } catch (error) {
            console.error('Error:', error);
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
        /*
        {
          name: 'Creado',
          selector: row => row.created_at,
          sortable: true
        },*/
        {
          name: 'Ultima modificación',
          selector: row => row.updated_at,
          sortable: true
        },
        { 
            name: 'Editar',
            grow: 0,
            cell: row => (
                <div className="cursor-pointer" onClick={ ()=> {
                    setUpdateUuid(row.uuid);
                    if(row.fullname != null) setUpdateFullname(row.fullname);
                    if(row.email != null) setUpdateEmail(row.email);
                    if(row.address != null) setUpdateAddress(row.address);
                    if(row.birthdate != null) setUpdateBirthdate(row.birthdate);
                    updateModal(true);
                }
                } >
                    <svg viewBox="0 0 24 24" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0671 2.27157C17.5 2.09228 17.9639 2 18.4324 2C18.9009 2 19.3648 2.09228 19.7977 2.27157C20.2305 2.45086 20.6238 2.71365 20.9551 3.04493C21.2864 3.37621 21.5492 3.7695 21.7285 4.20235C21.9077 4.63519 22 5.09911 22 5.56761C22 6.03611 21.9077 6.50003 21.7285 6.93288C21.5492 7.36572 21.2864 7.75901 20.9551 8.09029L20.4369 8.60845L15.3916 3.56308L15.9097 3.04493C16.241 2.71365 16.6343 2.45086 17.0671 2.27157Z" fill="#000000"></path> <path d="M13.9774 4.9773L3.6546 15.3001C3.53154 15.4231 3.44273 15.5762 3.39694 15.7441L2.03526 20.7369C1.94084 21.0831 2.03917 21.4534 2.29292 21.7071C2.54667 21.9609 2.91693 22.0592 3.26314 21.9648L8.25597 20.6031C8.42387 20.5573 8.57691 20.4685 8.69996 20.3454L19.0227 10.0227L13.9774 4.9773Z"></path> </g></svg>
                </div>
            )
        },
        { 
            name: 'Borrar',
            grow: 0,
            cell: row => (
                <div className="cursor-pointer" onClick={ ()=> {
                    setConfirmationUuid(row.uuid);
                    setConfirmationEmail(row.email);
                    confirmationModal(true);
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
                            <button className="py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200" type="button" data-config-id="auto-txt-6-3" onClick={ ()=>createModal(true) }>Crear usuario</button>  
                        </div>
                    </div>
                </div>
                    <div className="mt-4 sm:pr-8 table-container">
                    {isLoading ? (
                        <><p className="w-full text-center">Cargando datos...</p></>
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
                            {emailError && <p className="w-full text-center text-red-400">{emailError}</p>}
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
                            <DatePicker 
                                value={birthdate}
                                onChange={(e) => setBirthdate(e)}
                                maxDate={new Date()}
                                format="y-MM-dd"
                                id="birthdate"
                                placeholder="Fecha de nacimiento"
                                name="birthdate"
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
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ ()=>createModal(false) }>Cancelar</button>
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ createRequest }>Crear usuario</button>
                  </div>
                </div>
              </div>
        </section>

        <section className={ isOpenUpdate ? "" : "hidden" }>
              <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50" style={{ zIndex: 200 }}>
                <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
                  <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg p-4 text-center w-full">Actualizar usuario</h3>
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
                                    value={updateFullName}
                                    type="text"
                                    name="updateFullName"
                                    id="updateFullName"
                                    onChange={(e) => setUpdateFullname(e.target.value)}
                                    placeholder="Nombre completo"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email
                            </label>
                            <input
                                value={updateEmail}
                                type="email"
                                name="updateEmail"
                                onChange={(e) => setUpdateEmail(e.target.value)}
                                id="updateEmail"
                                placeholder="ejemplo@email.com"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {emailUpdateError && <p className="w-full text-center text-red-400">{emailUpdateError}</p>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Dirección
                            </label>
                            <input
                                value={updateAddress}
                                type="text"
                                name="updateAddress"
                                onChange={(e) => setUpdateAddress(e.target.value)}
                                id="updateAddress"
                                placeholder="Av. Falsa 123"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
                                Fecha de nacimiento
                            </label>

                            <DatePicker 
                                value={ (updateBirthdate!=='0000-00-00')? updateBirthdate : '' }
                                maxDate={new Date()}
                                onChange={(e) => setUpdateBirthdate(e)}
                                format="y-MM-dd"
                                id="birthdate"
                                placeholder="Fecha de nacimiento"
                                name="birthdate"
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
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ updateRequest }>Actualizar usuario</button>
                  </div>
                </div>
              </div>
        </section>

        <section className={ isOpenConfirmation ? "" : "hidden" }>
              <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50" style={{ zIndex: 200 }}>
                <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
                    
                <div className="sm:flex sm:items-start p-8">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg width="64px" height="64px" className="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.45600000000000007">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#ef4444"></path>
                    <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#ef4444"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z" fill="#ef4444"></path>
                  </g>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">¿Elimiar usuario?</h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">¿Seguro que desea eliminar el registro de <span className="font-bold">{confirmationEmail}</span>? Esta acción no se puede revertir.</p>
                </div>
              </div>
              </div>

                  <div>
                    <div className="flex justify-end items-center w-100 border-t p-3">
                        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ ()=>confirmationModal(false) }>Cancelar</button>
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={ deleteRequest }>Borrar usuario</button>
                    </div>
                </div>
              </div>
              </div>
        </section>

        </>
    )
}
