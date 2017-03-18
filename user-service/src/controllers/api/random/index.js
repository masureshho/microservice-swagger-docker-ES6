import { default as express } from 'express';
const router = express.Router(); // eslint-disable-line new-cap
const UserModel = require('../../../models/users');
/**
* @swagger
* /api/random:
*   get:
*     tags: ["/api"]
*     description: Returns hi,
*     responses:
*       200:
*         description: random page
*/
router.get('/', (req, res) => {
  var chris = new UserModel({
    name: 'Chris',
    username: `sevilayha${Math.random(100)}`,
    password: 'password'
  });
  chris.save()
  .then((d) => console.log(d));
  res.end('Hi');
});

export default router;
// export { router as randomRoute };