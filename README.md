## Prueba técnica FrontEnd
_Prueba técnica para Grupo avanza presentada por Eduardo Araya proyecto frontend._

## Requisitos del proyecto 🔧
* [Node 20.12.2](https://nodejs.org/en/download/package-manager) - Versión de node
* [react 18.3.1](https://react.dev/) - Versión de React

## Instrucciones de ejecución 🚀

- Descargar o clonar el package del proyecto
- Descomprimir, copiar o mover a la carpeta de destino para producción

## Instrucciones de instalación de recursos

Instalaremos todos los packetes de recursos de node con el comando:

```
npm install
```

## Configuración del proyecto

Este proyecto hace consumo del api del backend mediante axios, el archivo de configuración se encuentra en `{root}/src/config/api/userApi.js` en este archivo se encuentra la ruta de la api.

```js
    export const userApi = axios.create({
    baseURL: 'http://localhost/{nombre_carpeta_proyecto}/user',
    });
```
Una vez configurado puede ejecutar el comando start para inicializar el proyecto:

```
npm start
```

## Detalle adicional ✒️

_El sitio no deberia de tener problemas con cualquier ruta en la que sea almacenado_

_En este proyecto se incluyeron las siguientes librerias:_

* [Axios](https://axios-http.com/docs/intro) - Gestión y consumo de Api
* [React DateTable](https://www.npmjs.com/package/react-data-table-component) - Listado y organización de tablas
* [React DateTime](https://www.npmjs.com/package/react-datetime) - Selector de fechas

_El proyecto no cuenta validación de usuarios o sesiones por lo que utiliza un token estático, este sería:_

```
aaaaaaaa-1234-1234-cc12-a1a1a1a1a1a1
```
_Este se utiliza en todos los action de llamada de api disponibles en la ruta `{root}/src/actions` y corresponde a los archivos:_

- createUser.js
- deleteUser.js
- updateUser.js
- getAll.js


