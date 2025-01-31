import express from 'express'
import mongoose from 'mongoose'
import z from 'zod'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { contentModel, linkModel, tagModel, userModel } from './Database/schema';
import { userAuth } from './Middlewares/userAuth';
import { random } from './Utils/random';
dotenv.config();

const url = process.env.MONGO_URI
const app = express()
const JWT_SECRET = "lucifer"

app.use(express.json())
app.use(cors())

// Added the signup endpoint
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
// Added the signin endpoint
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

// Added the content endpoint
app.post('/api/v1/content',userAuth ,async (req,res)=>{
    try {
        const {type, title, link, tag} = req.body

        const requiredBody = z.object({
            type:z.string(),
            title:z.string().min(3,{message:"Minimum 3 characters required"}).max(100,{message:"Maximaum 100 characters can be used"}),
            link:z.string(),
            tag:z.string()
        })

        const {success, error} = requiredBody.safeParse(req.body)

        if(!success){
            console.log(error)
            res.status(411).json({
                message:"Invalid input"
            })
            return
        }
        

        const response = await contentModel.create({
            type,
            title,
            link,
            tag,
            //@ts-ignore
            userId:req.id
        })

        if (tag) {
            const tagDocument = await tagModel.findOne();
            if (tagDocument) {
                
                if (!tagDocument.tags.includes(tag)) {
                    tagDocument.tags.push(tag);
                    await tagDocument.save();
                }
            } else {
               
                await tagModel.create({ tags: [tag] });
            }
        }

        if(!response){
            res.status(500).json({
                message:"Data Entry Failed"
            })
            return
        }

        console.log(response)

        res.status(200).json({
            response
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal server down"
        })
        return
    }

})

// Added the fetch-content endpoint
app.get('/api/v1/fetch-content',userAuth, async (req,res)=>{
    try {
        //@ts-ignore
        const id = req.id
        console.log(id)
        const content = await contentModel.find({userId:id})
        if(content.length==0){
            res.status(404).json({
                message:"No content available"
            })
            return
        }
        console.log(content)
        res.json({
            content
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal server down"
        })
    }
})

// Added the delete-content endpoint
app.post('/api/v1/delete-content',userAuth,async (req,res)=>{
    try {
        const {id} = req.body
        const response = await contentModel.deleteOne({_id:id})
        console.log(response)
        if(!response){
            res.status(500).json({
                message:"A problem occured while deleting"
            })
            return
        }
        res.status(200).json({
            message:"Deleted successfully",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Something went wrong in the delete-content route"
        })
    }
})

// Added the share endpoint
app.post('/api/v1/share',userAuth, async (req,res)=>{
    try {
        const share = req.body.share
        if(share){
            const link = random()
            console.log(link)
            const existingHash = await linkModel.findOne({
                //@ts-ignore
                userId:req.id
            })
            if(existingHash){
                res.status(200).json({
                    hash:existingHash.hash,
                    message:"hash was already prepared"
                })
            }else{
                const response = await linkModel.create({
                    hash:link,
                    //@ts-ignore
                    userId:req.id
                })
                if(response){
                    res.status(200).json({
                        response:response.hash,
                        message:"successfully created hash"
                    })
                }
            }

        }else{
            const existingHash = await linkModel.findOne({
                //@ts-ignore
                userId:req.id
            })
            if(existingHash){
                const response = await linkModel.deleteOne({
                    //@ts-ignore
                    userId:req.id
                })
                console.log(response)
                if(response){
                    res.status(200).json({
                        message:"hash deleted successfully"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Share is not working"
        })
    }
})

// Added the shareId param route
app.get('/api/v1/brain/:shareid',async(req,res)=>{
    const {shareid} = req.params

    const response = await linkModel.findOne({hash:shareid})
    if(!response){
        console.log(response)
        res.status(404).json({
            message:"The user has turned off their sharable link"
        })
        return
    }
    const userId = response.userId
    const user = await userModel.findOne({
        _id:userId
    })

    if(!user){
        res.status(404).json({
            message:"User not found"
        })
        return
    }

    const content = await contentModel.find({userId:userId})
    if(content.length == 0){
        res.status(200).json({
            username:user.name,
            content:"This user has not added any content"
        })
    }else{
        res.status(200).json({
            username:user.name,
            content
        })
    }
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