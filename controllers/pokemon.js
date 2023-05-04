var Pokemon = require("../models/pokemon");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const pokemonValidationRules = () => {
    return [   
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),
        
        body("type")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Type must be specified.")
            .isAlphanumeric()
            .withMessage("Type has non-alphanumeric characters."),

        body("description")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Description must be specified.")
            .isAlphanumeric()
            .withMessage("Description has non-alphanumeric characters."),
        
        body("poids")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Last name must be specified.")
            .isNumeric()
            .withMessage("Last name has non-alphanumeric characters."),
            
        body("taille")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Last name must be specified.")
            .isNumeric()
            .withMessage("Last name has non-alphanumeric characters."),
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), studentValidationRules(), checkValidity, (req, res, next) => {
    
    var pokemon = new Pokemon({
        _id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        poids: req.body.poids,
        taille: req.body.taille,
      });

    pokemon.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Pokemon created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Pokemon.find(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Pokemon.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), studentValidationRules(), checkValidity,(req, res, next) => {
    
    var pokemon = new Pokemon({
        _id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        poids: req.body.poids,
        taille: req.body.taille,
      });

      Pokemon.findByIdAndUpdate(req.params.id, pokemon, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Pokemon with id "+req.params.id+" is not found !");
        }
        return res.status(201).json("Pokemon updated successfully !");
      });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Pokemon.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Pokemon with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("Pokemon deleted successfully !");
      });
}];