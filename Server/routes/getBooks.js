const express=require('express');

const router=express.Router();

const getBooks=require('../controllers/books');

router.get('/getbooks',getBooks.getBooks);
router.post('/addbook',getBooks.addbook);
router.get('/getbooks/:id',getBooks.getBookbyId);
router.put('/getbooks/:id',getBooks.editProduct);
router.delete('/getbooks/:id',getBooks.deleteProduct);
module.exports=router;