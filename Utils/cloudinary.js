const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'sudu', 
  api_key: '344875191948825', 
  api_secret: 'HC2xo0amXC9HBzBBVBPYQnetCG4' 
});

// exports.uploads = (file, folder) => {
//   return new Promise(resolve => {
//       cloudinary.uploader.upload(file, (result) => {
//           resolve({
//               url: result.url,
//               id: result.public_id
//           })
//       }, {
//           resource_type: "auto",
//           folder: folder
//       })
//   })
// }

module.exports = cloudinary