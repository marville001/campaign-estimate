const Joi = require("joi");

exports.validateCampaign = (campaign) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        church: Joi.string().required(),
        streetAddress: Joi.string().required(),
        otherAddress: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        adOffer: Joi.string().required(),
    });

    return schema.validate(campaign);
};
