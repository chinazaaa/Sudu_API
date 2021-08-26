const Store = require("../Models/store");

    //See just leave this Function like that. Scroll down for information
    function distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  
    //This is the data used, i.e. Your store coordinates
    exports.getStoreByLocation = async (req, res, next) => {
        try {
          const storeData = await Store.find();
          if (!storeData) {
            return res.status(404).json({ message: 'Store not found' })
          }

  
  
    const storeLocation = [];
  
    //FIXME This is where the Customer location(latitude and longitude) is going to be
    // const poslat = 3.8553506;
    // const poslng = 3.8553506;
      const poslat = req.params.lat;
    const poslng = req.params.long;
  
    for (var i = 0; i < storeData.length; i++) {
      // if this location is within 20.0KM of the customer, add it to the storeLocation array
      if (distance(poslat, poslng, storeData[i].location.coordinates[0], storeData[i].location.coordinates[1], "K") <= 20.0) {
        storeLocation.push(storeData[i]);
      }
    };
    if(storeLocation.length <= 0) {
      return res.status(404).json({message: 'No Store found in your area'})
      }
    return res.json({storeLocation});
  }
         // return res.json({ storeData})
         catch (error) {
            console.log(error)
          return res.status(404).json({ message: 'Store not found' })
        }
      }
      //console.log(runDistance());
     
    