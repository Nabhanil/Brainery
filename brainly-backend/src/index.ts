import express from 'express'
import mongoose from 'mongoose'
import z from 'zod'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import { userModel } from './Database/schema';

dotenv.config();

const url = process.env.MONGO_URI
const app = express()
const JWT_SECRET = "lucifer"

app.use(express.json())


app.post('/api/v1/signup',async (req,res)=>{
    try {
        const {name,password} = req.body
        const requiredBody = z.object({
            name:z.string().min(3,{message:"name should be minimum 3 letters"}).max(100,{message:"name should not exceed 100 characters"}),
            password:z.string().min(3,{message:"password should be minimum 3 letters"}).max(100,{message:"password should not exceed 100 characters"})
        })

        const {success, error} = requiredBody.safeParse(req.body)

        if(!success){
            console.log(error)
            res.status(411).json({
                message:"Invalid input"
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password,5)
        if(!hashedPassword){
            res.status(404).json({
                message:"Failed to create a hashed password"
            })
            return
        }
        
        try {
            const response = await userModel.create({
                name,
                password:hashedPassword
            })

            if(response){
                console.log(response)
                res.status(200).json({
                    response:response
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:"Data entry failed"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"internal server failed during signup"
        })
        return
    }

})


app.post('/api/v1/signin',async (req,res)=>{
    try {
        const {name, password} = req.body
        const requiredBody = z.object({
            name:z.string().min(3,{message:"name should be minimum 3 letters"}).max(100,{message:"name should not exceed 100 characters"}),
            password:z.string().min(3,{message:"password should be minimum 3 letters"}).max(100,{message:"password should not exceed 100 characters"})
        })

        const {success, error} = requiredBody.safeParse(req.body)

        if(!success){
            console.log(error)
            res.status(411).json({
                message:"Invalid input"
            })
            return
        }

        const user = await userModel.findOne({
            name
        })

        console.log(user)

        if(!user){
            res.status(411).json({
                message:"User doesnot esit ,please signup"
            })
            return
        }

        const response = await bcrypt.compare(password, user.password)

        if(!response){
            res.status(403).json({
                message:"Incorrect password"
            })
            return
        }

        const token = jwt.sign({
            id:user._id
        },JWT_SECRET)

        res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"internal server failed during signup"
        })
        return
    }

})

app.post('/api/v1/content',async (req,res)=>{

})

app.get('/api/v1/fetch-content',async (req,res)=>{

})
app.post('/api/v1/delete-content',async (req,res)=>{

})

app.post('/api/v1/share', async (req,res)=>{

})

app.get('/api/v1/brain/:shareid',async(req,res)=>{

})

const main = async ()=>{
    try {
        const response = await mongoose.connect(`${url}/Brainly`)
        // console.log(response)
        app.listen(process.env.PORT,()=>{
            console.log(`server is running on ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()