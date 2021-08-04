const Joi = require('joi');

module.exports.validateCountries = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(20).required(),
        rank: Joi.number().integer().required(),
        continent: Joi.string().valid('Oceania', 'Europe', 'Africa', 'Asia').required(),

    });
    return Joi.validate(data, schema);

};


