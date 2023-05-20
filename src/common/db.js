const path = require('path')
const fs = require('fs')

const read = function( fileName , parse){
    try {
        const filePath = path.join(__dirname , '..' ,'..' ,  'database' , fileName+'.json')
        const data = fs.readFileSync(filePath , 'utf-8')
        if(!data) return []
        return parse ? JSON.parse(data) : data
        
    } catch (error) {
        console.log(error.message)
    }
}

const write = function (fileName , data){
    try {
        const filePath = path.join(__dirname , '..' ,'..' ,  'database' , fileName+'.json')
        fs.writeFileSync(filePath , JSON.stringify(data , null , 4))
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    read , 
    write
}