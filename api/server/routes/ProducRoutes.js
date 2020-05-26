import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

// CRUD like RESTfull api
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);
router.get('/:id', ProductController.getAProduct);
router.delete('/:id', ProductController.deleteProduct);


// router.post('/', BookController.addBook);
// router.get('/:id', BookController.getABook);
// router.put('/:id', BookController.updatedBook);
// router.delete('/:id', BookController.deleteBook);

export default router;