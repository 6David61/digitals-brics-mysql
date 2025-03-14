const Joi = require("joi");

const addEvenement_InviterValidation = (body) => {
  const schema = Joi.object({
    nom: Joi.string().required().label("nom"),
    prenom: Joi.string().required().label("prenom"),
    email: Joi.string().required().label("email"),
    numero: Joi.string().required().label("numero"),
    societe: Joi.string().required().label("societe"),
    fonction: Joi.string().required().label("fonction"),
    idEvenement: Joi.number().required().label("idEvenement"),
  });
  return schema.validate(body);
};



module.exports = {
  addEvenement_InviterValidation,
};
