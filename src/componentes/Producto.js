import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
//redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction} from '../actions/productosActions';

const Producto = ({producto}) => { //extraemos del prop el producto.

    //Dispatch para ejectuar las accciones
    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {
        //confirmacion sweet alert
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Está seguro que quiere eliminar este libro?',
            text: "No se podrá recuperar una vez eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ACEPTAR',
            cancelButtonText: 'CANCELAR',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'El libro se ha eliminado de la lista.',
                'success'
              )
              dispatch(borrarProductoAction(id));
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                '',
                'No se ha borrado el libro',
                'error'
              )
            }
          })
        
        //console.log(id);
        
    }

    return (
    <tr>
        <td>{producto.nombre}</td>
        <td><span className="font-weight-bold">$ {producto.precio}</span></td>
        <td className="acciones">
            <Link to={`productos/editar/${producto.id}`} className="btn btn-primary mr-2">EDITAR</Link>
            <button className="btn btn-danger" onClick={() => confirmarEliminarProducto(producto.id) }>ELIMINAR</button>
        </td>
    </tr>
    );
}

export default Producto;