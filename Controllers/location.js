const Salon = require("../Models/salon");

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
  
    //This is the data used, i.e. Your Salon coordinates
    exports.getSalonByLocation = async (req, res, next) => {
        try {
          //const salonData = await Salon.find().select({"location.coordinates":1});
          const salonData = await Salon.find();
          if (!salonData) {
            return res.status(404).json({ message: 'Salon not found' })
          }

  
  
    const salonLocation = [];
  
    //FIXME This is where the Customer location(latitude and longitude) is going to be
    // const poslat = 3.8553506;
    // const poslng = 3.8553506;
      const poslat = req.params.lat;
    const poslng = req.params.long;
  
    for (var i = 0; i < salonData.length; i++) {
      // if this location is within 20.0KM of the customer, add it to the salonLocation array
      if (distance(poslat, poslng, salonData[i].location.coordinates[0], salonData[i].location.coordinates[1], "K") <= 20.0) {
        salonLocation.push(salonData[i]);
      }
    };
    if(salonLocation.length <= 0) {
      return res.status(404).json({message: 'No Salon found in your area'})
      }
    return res.json({salonLocation});
  }
         // return res.json({ salonData})
         catch (error) {
            console.log(error)
          return res.status(404).json({ message: 'Salon not found' })
        }
      }
      //console.log(runDistance());
     
    