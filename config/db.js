const mongoose = require('mongoose');
require("dotenv").config();
const { MONGOLAB_URI, API_PORT } = process.env;

mongoose.Promise = global.Promise;

try {
  mongoose.connect( 'mongodb+srv://Sudu:2UvwGy7Z7VVOLFxp@cluster0.rgmm1.mongodb.net/Sudu?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
} catch (err) {
  throw err;
}

mongoose.connection.on("connected", () => {
  console.log(`connected to database Sudu DB`);
});

// To Remove moongoose deprecation warnings
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);