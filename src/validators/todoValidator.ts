import Joi, { ObjectSchema, ValidationResult } from '@hapi/joi';

export const todoCreateValidationSchema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().default(false),
    order: Joi.number().default(0)
});

export const todoUpdateValidationSchema = Joi.object({
    title: Joi.string(),
    completed: Joi.boolean(),
    order: Joi.number()
});

/**
 * Validates the provided data against the schema.
 * 
 * @param data The data to be validated.
 * @param schema The schema to validate against.
 * @returns The validation result.
 */
export const validateTodo = (data: any, schema: ObjectSchema): ValidationResult => {
    return schema.validate(data);
};
