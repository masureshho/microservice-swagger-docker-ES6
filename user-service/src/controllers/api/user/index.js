import { default as express } from 'express';
import { saveUser, getAllUsers } from '../../../models/users';
const router = express.Router(); // eslint-disable-line new-cap
/**
* @swagger
* /api/user:
*   get:
*     tags: ["Users"]
*     description: get users
*     responses:
*       200:
*         description: User Model
*         schema:
*           $ref: '#/definitions/userModel'
*/
router.get('/', (req, res) => {
  getAllUsers()
  .then((users) => res.json(users));
});

/**
* @swagger
* /api/user:
*   post:
*     tags: ["Users"]
*     description: get users
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - name: person
*         in: body
*         required: true
*         description: The person to create.
*         schema:
*           $ref: '#/definitions/userModel'
*     responses:
*       204:
*         description: Person succesfully created.
*       405:
*         description: Invalid input
*/
router.post('/', (req, res, next) => {
  const { name, username, password } = req.body;
  saveUser({ name, username, password })
  .then((d) => res.json(d))
  .catch((e) => next(e));
});

export default router;