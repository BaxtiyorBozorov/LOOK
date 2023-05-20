const { read , write} = require('../common/db')
const idGenerate = require('../common/id.generate')
const ERRORS_CODE = require('../common/errors/errors')
const GET = (req , res ) =>{
    try {
        const foods = read('foods' , true)
        res.json(foods)
    } catch (error) {
        return res.json({
            code : ERRORS_CODE.UNKOWN_ERROR , 
            message : error.message
        })
    }
}

const POST = (req , res ) =>{
    try {
        const {name , fileUrl , price} = req.body
        // console.log(req);
        if(!name || !fileUrl || !price) throw new Error("Invalid input")
        const id = idGenerate()
        const newFood = {
            id,
            name,
            fileUrl,
            price
        }
        const foods = read('foods' , true)
        // console.log(foods);
        foods.push(newFood)
        write('foods' , foods)
        res.json({
            code : ERRORS_CODE.SUCCES , 
            message : "OK" , 
            data : newFood
        })
        
    } catch (error) {
        return res.json({
            code : ERRORS_CODE.UNKOWN_ERROR,
            message : error.message
        })
    }
}

const PUT = (req , res ) =>{
    
    try {
        const id = req.params.id
        const foods = read('foods' , true)
        const foodIndex = foods.findIndex( el =>  el.id === +id)
        if(foodIndex == -1) throw new Error( 'food not found')
        const {name , fileUrl , price} = req.body
        foods[foodIndex].name = name ? name : foods[foodIndex].name
        foods[foodIndex].fileUrl = fileUrl ? fileUrl : foods[foodIndex].fileUrl
        foods[foodIndex].price = price ? price : foods[foodIndex].price
        write('foods' , foods)
        res.json({
            message : "OK" , 
            data : {
                name: foods[foodIndex].name , 
                fileUrl : foods[foodIndex].fileUrl,
                price: foods[foodIndex].price
            }
        })
        
    } catch (error) {
        res.json({
            code : ERRORS_CODE.UNKOWN_ERROR , 
            message : error.message
        })
    }
}

const DELETE = (req , res ) =>{
    try {
        const id = req.params.id
        const foods = read('foods' ,true )
        const foodIndex = foods.findIndex( el => el.id === +id)
        if(foodIndex == -1) throw new Error('food not found')
        foods.splice(foodIndex , 1)
        write( 'foods' , foods)
        res.send('food succesfully deleted')
    } catch (error) {
        res.json({
            code:ERRORS_CODE.UNKOWN_ERROR , 
            message : error.message
        })
    }
}

module.exports = {
    GET , 
    POST , 
    PUT , 
    DELETE
}