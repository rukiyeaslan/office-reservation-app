const express = require('express');
const deskController = require('../controllers/deskController');

const router = express.Router();

router.get('/create', deskController.desk_create_get);
// router.get('/', deskController.desk_index);
router.post('/', deskController.desk_create_post);
router.get('/:id', deskController.desk_details);
router.delete('/:id', deskController.desk_delete);

module.exports = router;