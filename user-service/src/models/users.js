import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// create a schema
/**
 * @swagger
 * definitions:
 *   userModel:
 *     type: object
 *     required:
 *       - name
 *       - username
 *       - location
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       username:
 *         type: string
 *       location:
 *         type: string
 *       password:
 *         type: string
 *     example:
 *      name: Suresh
 *      username: suresh2049
 *      password: password123
 *      location: Ratopul
 */
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
const UserModel = mongoose.model('User', userSchema);
export default UserModel;

export function saveUser(user) {
  var chris = new UserModel(user);
  return chris.save();
}

export function getAllUsers() {
  return UserModel.find({}, { name:1, username:1, location:1 });
}