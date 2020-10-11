const optionsSchema = Joi.object({

    multiplier: Joi.number()
                   .integer()
                   .min(1)
                   .max(10),
    
});