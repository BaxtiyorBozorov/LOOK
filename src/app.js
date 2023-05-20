const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

const foodRoute = require('./router/foodRouter')
const userRoute = require('./router/userRouter')

const PORT = process.env.PORT || 7890
const HOST = process.env.HOST || 'localhost'
const app = express()
app.use(express.json())
app.use(fileUpload())

app.use('/food' , foodRoute)
app.use('/user' , userRoute)
app.use('/order' )
app.use('/uploads' , (req , res)=>{
    const {image} = req.files
    const fileName = image.md5 + path.extname(image.name)
    const filePath = path.join(__dirname , '..' , 'uploads' , fileName)
    image.mv(filePath)
    res.json({
        message : "OK" , 
        data : fileName
    })
})
app.listen(PORT , ()=> console.log( `Server is running on http://${HOST}:${PORT}`))

