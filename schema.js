const Joi=require("joi");
// for server side validation  (prevent invalid data from postman or hopscotch)
module.exports.listingSchema=Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().allow({ country: { $regex:"", $options: "i" } }),
        location: Joi.string().required(),
        price: Joi.number().required().min(1),
        image: Joi.string().allow("",null),
        category:Joi.string().required(),
    }).required()
});

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
});