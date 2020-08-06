import React, {useState} from 'react';
//redux
import { crearNuevoProductoAction } from "../actions/productosActions";
import { validarFormularioAction } from "../actions/validacionActions";
import { validacionExito } from "../actions/validacionActions";
import { validacionError } from "../actions/validacionActions";
import { useDispatch, useSelector } from "react-redux"; //useSelector es la forma de acceder al state

const NuevoProducto = ({history}) => {

    //state
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

     //crear el nuevo producto
    const dispatch = useDispatch();
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));
    const validarFormulario = () => dispatch(validarFormularioAction());
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());

    //Obtener Datos del State
    const error = useSelector((state) => state.error.error);

    //agregar nuevo producto
    const submitNuevoProducto = e => {
        e.preventDefault();

        validarFormulario();

        //validar formulario
        if(nombre.trim() === '' || precio.trim() === ''){
            console.log('error en formulario');
            errorValidacion();
            return;
        }

        //Si pasa la validacion
        exitoValidacion();

        //Crear nuevo producto
        agregarProducto({
            nombre, 
            precio
        });
        
        

        //redireccionar
        history.push('/');
    }

    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro" 
                                    value={nombre}
                                    onChange={ e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro" 
                                    value={precio}
                                    onChange={ e => guardarPrecio(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {error ? <div className="font-weigth-bold alert alert-danger text-center mt-4"> TODOS LOS CAMPOS SON OBLIGATORIOS</div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;