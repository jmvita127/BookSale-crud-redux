import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
} from '../types';

import clienteAxios from '../config/axios';
// crear funcion de nuevo producto - funcion principal 

export function crearNuevoProductoAction(producto){
     return (dispatch) => { //dispatch va a mandar a llamar las otras dos acciones, producto exito y agregar producto.
        dispatch(nuevoProducto());

        //insertar en la api
        clienteAxios.post('/libros', producto)
            .then(respuesta => {
                console.log(respuesta);
                //si se inserta coerrectamente la api:
                dispatch(agregarProductoExito(producto));
                
            })
            .catch(error=>{
                console.log(error);
                //si hay un error
                dispatch(agregarProductoError(error));
            })

        
    }
 } 

 export const nuevoProducto = () => ({
     type: AGREGAR_PRODUCTO
 }) 

 export const agregarProductoExito = producto => ({ //pasa a ser funcion de producto porque el payloda modifica al state. Ver en reducer.
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
}) 

export const agregarProductoError = error =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error 
})

//Obtener listado de productos consultnado API
export function obtenerProductosAction(){
    return (dispatch) => {
        dispatch(obtenerProductosComienzo());
        //consultar api para traer productos
        clienteAxios.get('/libros') //clientesAxios tiene el localhost:4000 
        .then(respuesta =>{
            console.log(respuesta);
            dispatch(descargaProductosExitosa(respuesta.data)); // para acceder al objeto que estoy obteniendo por get.
        })
        .catch(error =>{
            console.log(error);
            dispatch(descargaProductosError());
            
        })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})


//FUNCION QUE ELIMINA PRODUCTO SELECCIONADO
export function borrarProductoAction( id ) {
    return (dispatch) => {
        dispatch( obtenerProductoEliminar() )

        // Eliminar en la API
        clienteAxios.delete(`/libros/${id}`)
            .then(respuesta => {
                // console.log(respuesta);
                dispatch( eliminarProductoExito(id)  );
            })
            .catch(error => {
                // console.log(error);
                dispatch( eliminarProductoError() );
            })
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})


// Obtener el Producto a Editar
export function obtenerProductoEditarAction(id) {
    return(dispatch) => {
        dispatch(obtenerProductoAction());

        // obtener producto de la api
        clienteAxios.get(`/libros/${id}`)
            .then(respuesta => {
                console.log(respuesta.data);
                dispatch(obtenerProductoEditarExito(respuesta.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(obtenerProductoEditarError(error));
            })
    }
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
})


// EDITAR PRODUCTO Y GUARDARLO EN LA DB.JSON
export function editarProductoAction(producto){
    return(dispatch) =>{
        dispatch(comenzarEdicionProducto())

        //consular API
        clienteAxios.put(`/libros/${producto.id}`, producto) //el producto es el objeto que llena en el formulario con los nuevos datos para realizar el cambio
        .then(respuesta =>{
            console.log(respuesta);
            dispatch(editarProductoExito(respuesta.data));

        })
        .catch(error => {
            console.log(error);
            dispatch(editarProductoError(error));
        })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})