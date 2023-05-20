const { read , write} = require('../common/db')
const idGenerate = require('../common/id.generate')
const ERRORS_CODE = require('../common/errors/errors')

const GET = (req , res)=>{
    const users = read('users' , true)
    res.send(users)
}

const POST = (req , res)=>{
    try {
        const {name , contact} = req.body
        if( !name || !contact) throw new Error('Invalid input')
        const id = idGenerate()
        const newUser = {
            id , 
            name , 
            contact
        }
        const users = read('users' , true)
        users.push(newUser)
        write('users' , users)
        res.json({
            message : "OK" , 
            data : newUser
        })
        
    } catch (error) {
        res.json({
            code : ERRORS_CODE.UNKOWN_ERROR,
            message : error.message
        })
    }
}

const PUT = (req , res)=>{
    try {
        const id = req.params.id
        const users = read('users' , true)
        const userIndex = users.findIndex( el => el.id === +id)
        if(userIndex == -1) throw new Error("user not found")
        const {name , contact} = req.body
        users[userIndex].name = name ? name : users[userIndex].name
        users[userIndex].contact = contact ? contact : users[userIndex].contact
        write('users' , users) 
        res.json({
            message : "OK" , 
            data : {
                id: +id,
                name : users[userIndex].name , 
                contact : users[userIndex].contact
            }
        })

    } catch (error) {
        res.json({
            code:ERRORS_CODE.UNKOWN_ERROR , 
            message : error.message
        })
    }
}

const DELETE = (req , res)=>{
    try {
        const id = req.params.id
        const users = read('users' , true)
        const userIndex = users.findIndex( el => el.id === +id)
        if(userIndex == -1) throw new Error('user not found')
        users.splice(userIndex , 1)
        write('users' , users)
        res.send('user succesfully deleted')
    } catch (error) {
        res.json({
            code : ERRORS_CODE.UNKOWN_ERROR , 
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