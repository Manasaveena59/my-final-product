const Restaurants = require('../model/restaurantModel');
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
    if (mealtype && cuisine && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
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