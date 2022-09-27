var restaurantSchema = require("../model/restaurantModel")
module.exports.filterRestaurants = (req, res) => {
    let { mealtype, cuisine, location, lcost, hcost, page, sort } = req.body;
    
    page = page ? page : 1; // default page no. = 1
    sort = sort ? sort : 1; // 1 is ascending -1 is descending

    let filterPayload = {};
    const itemsPerPage = 2;

    let startIndex = itemsPerPage * page - itemsPerPage; // 2 * 1 - 2 = 0 
    let endIndex = itemsPerPage * page; // 2 * 1 = 2

    if (mealtype) {
        filterPayload["type.mealtype"] = mealtype; 
    }
    if (mealtype && cuisine) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && hcost && lcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && cuisine && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && location) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
    }
    if (mealtype && location && cuisine) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && location && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && location && cuisine && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    console.log(filterPayload);
    Restaurants.find(filterPayload).sort({ cost: sort })
        .then(response => {
            // Pagination Logic 
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurants: filteredResponse })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
getRestaurants = (req, res, next) => {
    restaurantSchema.find((err, response) => {
        if (err)
            res.send("Exception Occured")
        else
            res.send(response);
    })
}

getRestaurantByName = (req, res, next) => {
    restaurantSchema.find({ "city": req.query.name }, (err, response) => {
        if (err)
            res.send("Exception Occured")
        else
            res.send(response);
    })
}

getRestaurantById = (req, res, next) => {
    restaurantSchema.findById(req.params.id, (err, response) => {
        if (err)
            res.send("Exception Occured")
        else
            res.send(response);
    })
}

addRestaurant = (req, res, next) => {
    var restautantsToAdd = new restaurantSchema({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        location: req.body.location,
        image: req.body.image,
        cuisine: req.body.cuisine,
        min_price: req.body.min_price,
        contact: req.body.contact,
        locality: req.body.locality,
        city: req.body.city,
    })

    restautantsToAdd.save((err, response) => {
        if (err)
            res.send("Exception Occurred");
        else
            res.send({ status: 200, message: "Restaurant added successfully", restaurant: response });
    })
}

updateRestaurant = (req, res, next) => {
    restaurantSchema.updateMany({ "name": req.query.name }, { "address": req.body.address }, (err, reponse) => {
        if(err)
            res.send("Exception Occurred")
        else
            res.send({ status: 200, message: "Restaurant Updated Successfully"});
    })
}

deleteRestaurantByName = (req, res, next) => {
    restaurantSchema.remove({ "name": req.query.name }, (err, reponse) => {
        if(err)
            res.send("Exception Occurred")
        else
            res.send({ status: 200, message: "Restaurant Deleted Successfully"});
    })
}

module.exports = { getRestaurants, addRestaurant }