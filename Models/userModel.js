const mongoose = require("mongoose");

// Define a schema for your model
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  // Define the structure of your model
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can define more fields here
});

// Create a model using the schema
const UserModel = mongoose.model("User", UserSchema);

// Export the model to be used in other parts of your application
module.exports = UserModel;
