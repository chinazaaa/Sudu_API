const cloudinary = require("../Utils/cloudinary");
const Store = require("../Models/store");
exports.updateStoreAvatar = async (req, res) => {
    try {
        let user = await Store.findById(req.params.id);
    
        // Delete image from cloudinary
       // await cloudinary.uploader.destroy(user.cloudinary_id);  // truncate the db and add cloudinary_id to the model and uncomment this line and also this fuction parameter you're passing isnt complete, google this fuction and see how it is implemented
        // Upload image to cloudinary
        let result;
        if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path);
          console.log(result)
        }
        const data = {
          //name: req.body.name || user.name,
          avatar: result.secure_url || user.avatar,
          // cloudinary_id: result.public_id || user.cloudinary_id,
        };
        user = await Store.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);
      } catch (err) {
        console.log(err);
      }
    };




    
