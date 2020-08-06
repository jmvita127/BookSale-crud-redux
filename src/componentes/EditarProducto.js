import React, {useEffect, Fragment, useRef} from 'react'; //useRef es un hook que permite acceder al elemento directamente!

// Redux
import {useDispatch, useSelector} from 'react-redux'; //nos permite acceder al state el selector
import {obtenerProductoEditarAction, editarProductoAction} from '../actions/productosActions';
import { validarFormularioAction } from "../actions/validacionActions";
import { validacionExito } from "../actions/validacionActions";
import { validacionError } from "../actions/validacionActions";
import Swal from 'sweetalert2';

const EditarProducto = ( { history, match }) => { //match accedemos al id propio del objeto e history nos permite redireccionar


    //Dispatch para ejecutar la accion principal
    const dispatch = useDispatch();

    const editarProducto = (producto) => dispatch(editarProductoAction(producto)); //alias de cuando se edite un producto
    const validarFormulario = () => dispatch(validarFormularioAction());
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());

    //crear los refs
    const nombreRef = useRef ('');
    const precioRef = useRef('');


    //obtener el id a Editar
    const {id} = match.params;
    useEffect( () => {
        dispatch(obtenerProductoEditarAction(id))
    }, [dispatch, id]);

    //Acceder al state
    const producto = useSelector (state => state.productos.producto);
    const error = useSelector(state => state.productos.error);

    //cuando carga la api
    if(!producto) return 'cargando...';

    const submitEditarProducto = e => {
        e.preventDefault();

        //validar el formulario 
        validarFormulario();

        if(nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === ''){
            errorValidacion();
            return;

        }

        



        //guardar los cambios
        //console.log(nombreRef.current.value);
        editarProducto({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value,
        });

        Swal.fire(
            '¡Almacenado!',
            'El produco se actualizó correctamente.',
            'success'
        )
        //no hay error
        exitoValidacion();

    


        //redireccionar
        history.push('/');
    }
  

    return(

        <Fragment>
        {error ? 
        <div className="font-weigth-bold alert alert-danger text-center mt-4">ERROR - INTENTE NUEVAMENTE</div> 
        : 


        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit = {submitEditarProducto}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                    ref={nombreRef} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio"
                                    defaultValue={producto.precio}
                                    ref={precioRef} 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        
 
                    </div>
                </div>
            </div>
        </div>
        }
        </Fragment>

    );
}

export default EditarProducto;