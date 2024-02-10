const Joi = require('joi');

const getSchema = (type) => {
    switch (type) {
        case 'register': {
            return Joi.object().keys({
                username: Joi.string().required().min(4),
                fullname: Joi.string().required().min(4),
                password: Joi.string().required().min(4),
                email: Joi.string().required().email(),
                mobile: Joi.string().required(),
                roleId: Joi.number()
            })
        }
       case 'staff_register':{
        return Joi.object().keys({
            username: Joi.string().required().min(4),
            password: Joi.string().required().min(4),
        })
       }
        case 'login': {
            return Joi.object().keys({
                username: Joi.string().required(),
                password: Joi.string().regex(/^[A-Za-z0-9]+$/).required()
            })
        }
        default: {
            return null;
        }
    }
}
module.exports = (type) => (req, res, next) => {
    const schema = getSchema(type);
    if (schema) {
        const result = schema.validate(req.body);
        if (result.error) {
            const { details } = result.error;
            const message = details[0].message.replace(/"|'/g, '');
            return res.status(400).json({
                error: message
            });
        }
    }
    next();
}