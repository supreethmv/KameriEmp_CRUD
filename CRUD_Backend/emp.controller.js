const Employee = require('./emp.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const employee = new Employee({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        contactPreference: req.body.contactPreference,
        dateOfBirth: req.body.dateOfBirth,
        department: req.body.department,
        isActive: req.body.isActive,
        photoPath: req.body.photoPath,
    });

    // Save Product in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Employee.findById(req.params._id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Product not found with id " + req.params._id
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving Employee with id " + req.params._id
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Find and update product with the request body
    Employee.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        contactPreference: req.body.contactPreference,
        dateOfBirth: req.body.dateOfBirth,
        department: req.body.department,
        isActive: req.body.isActive,
        photoPath: req.body.photoPath,
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Product not found with id " + req.params._id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params._id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params._id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Product not found with id " + req.params._id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params._id
        });
    });
};