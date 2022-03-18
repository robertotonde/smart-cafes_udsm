const express = require ('express');

const router = express.Router();

const Pizza = require('../models/pizzaModel');


router.get('/getallpizzas', async (req, res) => {

    try {
        const pizzas = await Pizza.find({})

        res.send(pizzas)
    } catch (error) {

        return res.status(400).json({ message : error  })
        
    }


});

router.post('/uploadPizzas', async (req, res) => {
   
    const {name, category,img, description,cafe ,prices ,varients } = req.body;
 
    const newPizza = new Pizza ({name, category,img, description,cafe ,prices ,varients});
 
    try {
        newPizza.save();
        res.send('upload pizass successfully')
     
        
    } catch (error) {
 
     return res.status(400).send({ message : error})
        
    }
 
 });

module.exports = router;