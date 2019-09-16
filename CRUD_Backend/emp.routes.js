module.exports = (app) => {
    const employees = require('./emp.controller.js');

    // Create a new Product
    app.post('/employees', employees.create);

    // Retrieve all Products
    app.get('/employees', employees.findAll);

    // Retrieve a single Product with productId
    app.get('/employees/:_id', employees.findOne);

    // Update a Note with productId
    app.put('/employees/:_id', employees.update);

    // Delete a Note with productId
    app.delete('/employees/:_id', employees.delete);
}