const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoom);
router.patch('/:id', authMiddleware, adminMiddleware, roomController.updateRoom);
router.delete('/:id', authMiddleware, adminMiddleware, roomController.deleteRoom);

module.exports = router;