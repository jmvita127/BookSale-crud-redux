import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Redux
import store from './store';
import {Provider} from 'react-redux';
//Componentes
import Header from './componentes/Header';
import Productos from './componentes/Productos';
import NuevoProducto from './componentes/NuevoProducto';
import EditarProducto from './componentes/EditarProducto';

function App() {
  return (
    //Con provider va a estar en todas las paginas // Y dentro de switch va a ser exclusivo de cada una de las paginas.
    <Router> 

      <Provider store={store}>
        <Header/>
          <div className="container">
            <Switch> 
              <Route exact path="/" component={Productos}/>
              <Route exact path="/productos/nuevo" component={NuevoProducto}/>
              <Route exact path="/productos/editar/:id" component={EditarProducto}/>
            </Switch>
          </div>
      </Provider>

    </Router>
  );
}

export default App;
