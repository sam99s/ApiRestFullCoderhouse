const express = require('express');

const router = express.Router();

const Contenedor = require('../contenedor');
const productosContenedor = new Contenedor('./productos.txt')

router.get('/', async (req, res) =>{
    const lista = await productosContenedor.getAll()
    res.send({
        data: lista
    })
})

router.get('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoSeleccionado = await productosContenedor.getById(idProducto)
    if (!productoSeleccionado){
        res.send({ error : 'producto no encontrado' })
    }else{
        res.send({
            data: productoSeleccionado
        })
    }
})

router.post('/', async (req, res) =>{
    const newProducto = req.body; 
    const idProductoNuevo = await productosContenedor.save(newProducto);
    res.send({
        message : 'success',
        data: {
            ...newProducto,
            id: idProductoNuevo
    }
})
})

router.put('/:id', async (req, res) =>{
    const datosNuevos = req.body
    const productoUpdate = await productosContenedor.update(req.params.id,datosNuevos)

    if (!productoUpdate){
        res.send({
            error : 'Producto no encontrado',
            data : productoUpdate
        })

    } else{
        res.send({
            message :'Operación Exitosa',
            data : productoUpdate
        })
    }
})


router.delete('/:id', async (req, res) =>{
    idProducto = Number(req.params.id)
    const productoAEliminiar = await productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        res.send({ error : 'Producto no Encontrado' })
    }else {
        await productosContenedor.deleteById(idProducto);
        res.send({ message : 'Producto Eliminado de Forma Correcta' })
    }
})

module.exports = router;