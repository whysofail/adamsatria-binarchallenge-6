
import db from "../models/index.js"
const Cars = db.Cars
export const getCars = async(req, res) => {
    try {
        const cars = await Cars.findAll({
            paranoid : false
        });
        res.status(200).json(cars);
    } catch (error) {
        console.log(error);
    }
}

export const getCarsActive = async (req,res) => {
    try {
        const cars = await Cars.findAll()
        res.status(200).json(cars)
    } catch (error) {
        console.log(error);
    }
}
export const getCarsWhere = async (req, res) => {
    try {
        const cars = await Cars.findAll({
            where :{
                capacity : req.params.size
            }   
        })
        res.status(200).json(cars);
    } catch (error) {
        console.log(error);
    }
}
export const getCarsById = async (req, res) => {
    try {
        const cars = await Cars.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(cars);
    } catch (error) {
        res.json({msg : "Id not found"});
    }  
}

export const createCars = async (req, res, next) => {
    const userId = req.user.userId;
    try {
       const cars = await Cars.create({
            name : req.body.name,
            capacity : req.body.capacity,
            description : req.body.description,
            rent : req.body.rent,
            img : req.file === undefined ? req.body.img : req.file.filename , 
            created : new Date(),
            createdBy : userId
         })
         res.status(200).json({msg : "Cars Inserted.", data : cars});
        next()
    } catch (err) {
        console.log(err);
    }
}

export const updateCars = async(req, res) => {
    try {
        const userId = req.user.userId;
        await Cars.update({
            name : req.body.name,
            capacity : req.body.capacity,
            description : req.body.description,
            rent : req.body.rent,
            img : req.file === undefined ? req.body.img : req.file.filename,
            created : Cars.created, // Prevent 'created' fields being automatically changed.
            updated : new Date(),
            updatedBy : userId
        }, 
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg : "Cars Updated."});
    } catch (err) {
        res.json({msg : "Id not found"});
    }
}

export const deleteCars = async (req, res) => {
    try {
        const userId = req.user.userId;
        await Cars.update({
            deletedBy : userId
        },
        {
            where: {
                id: req.params.id
            }
        })
        await Cars.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg : "Cars Deleted."});
    } catch (err) {
        res.json({msg : "Id not found"});
    }
}