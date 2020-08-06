import React, {useEffect}  from 'react';
import Producto from './Producto';

//Redux
import {useSelector} from 'react-redux'; //use selector nos permite acceder al state
import {useDispatch} from 'react-redux';
import {obtenerProductosAction} from '../actions/productosActions';

const Productos = () => {
    //mandar a llamar la accion ppal para retornar productos
    const dispatch = useDispatch();

    useEffect(() => {
        //Productos cuando el componente este listo
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
        }, []); //le pasamos un array vacio para que se ejecute solamente una unica vez.

    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const productos = useSelector(state => state.productos.productos);


    return(
        <React.Fragment>
            {error ? <div className="font-weight-bold aler alert-danger text-center mt-4">Error al cargar los libros.</div> : null }           
                
                <h2 className="text-center my-5">Listado de Productos</h2>
                    <table className="table table-striped">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {productos.map(producto =>(
                                <Producto
                                     key = {producto.id} /*//el id viene desde la api */
                                    producto = {producto} /*//esto es el producto completo para acceder a sus propiedades*/
                                />
                            ))}
                        </tbody>
                    </table> 

                    { loading ? 'Cargando..' : null }
                
                

        </React.Fragment>
    );
}

export default Productos;