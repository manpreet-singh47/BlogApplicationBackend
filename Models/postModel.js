const mongoose = require("mongoose");

// Define a schema for your model
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  // Define the structure of your model
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // You can define more fields here
});

// Create a model using the schema
const BlogModel = mongoose.model("Blogs", BlogSchema);

// Export the model to be used in other parts of your application
module.exports = BlogModel;
