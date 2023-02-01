/*
    Rutas de eventos /events
    [host]/api/events
*/

const { Router } = require("express");
const {check} = require('express-validator');

const { validarJWT } = require("../middlewares/validar-jwt");

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use( validarJWT );

// obtener eventos
router.get('/', getEventos);

// crear evento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio no es correcta').custom( isDate ),
        check('end', 'Fecha de finalizacion no es correcta').custom( isDate ),
        validarCampos,
    ], 
    crearEvento
);

// actualizar evento
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio no es correcta').custom( isDate ),
        check('end', 'Fecha de finalizacion no es correcta').custom( isDate ),
        validarCampos,
    ], 
    actualizarEvento,
);

// borrar evento
router.delete(
    '/:id', 
    eliminarEvento
);

module.exports = router;