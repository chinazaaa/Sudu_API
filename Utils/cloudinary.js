const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'saloney',
  api_key: '996346525813742',
  api_secret: 'Pb_HyYWpeDDJEquk4d-z8FzJQYo',
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