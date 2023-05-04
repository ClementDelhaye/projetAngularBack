var Dresseur = require("../models/dresseur");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const dresseurValidationRules = () => {
    return [   
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),

        body("description")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Description must be specified.")
            .isAlphanumeric()
            .withMessage("Description has non-alphanumeric characters."),
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
    
    var dresseur = new Dresseur({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
      });

    dresseur.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Dresseur created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Dresseur.find(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Dresseur.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), studentValidationRules(), checkValidity,(req, res, next) => {
    
    var dresseur = new Dresseur({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
      });

      Dresseur.findByIdAndUpdate(req.params.id, dresseur, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Dresseur with id "+req.params.id+" is not found !");
        }
        return res.status(201).json("Dresseur updated successfully !");
      });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Dresseur.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Dresseur with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("Dresseur deleted successfully !");
      });
}];