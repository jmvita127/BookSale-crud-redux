import axios from "axios"; //para llamados a una api. instalar en consola

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000'
})

export default clienteAxios;