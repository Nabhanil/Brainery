import {  useEffect, useState } from "react"
import axios from "axios"
import { DeletIcon } from "../Icons/DeleteIcon"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Button } from "./Button"
import { Card } from "./Card"
import { ComponentModel } from "./ComponentModel"
import SideBar from "./SideBar"
import { BackendURL } from "../config"


export const Dashboard = ()=>{
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        const fetchContent = async ()=>{
            const token = localStorage.getItem("token")
            const result = await axios.get(`${BackendURL}/api/v1/fetch-content`,{
                headers:{
                    token:token
                }
            })
            console.log(result)
        }
        fetchContent()
    },[])

    return <>
        <SideBar/>
        <div className="ml-72 min-h-screen bg-gray-500">
            <ComponentModel open={open} setOpen={setOpen}/>
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl p-3 m-2 text-purple-400">All of your brains here:</h1>
                <div>
                    <Button title ="Share Brain" size="md" variant="secondary" startIcon={<ShareIcon/>} className="rounded-md"/>
                    <Button onClick={()=>{setOpen(true)}} title ="Add Content" size="md"  variant="primary" startIcon={<PlusIcon/>} className="rounded-md " />
                </div>
            </div>
            <div className="flex flex-wrap gap-x-2.5 p-5 ">
                <Card tags="#life" title="First One" link="https://www.youtube.com/watch?v=Q9OW4iaQl-k" type="youtube" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
                <Card title="Second One" link="https://x.com/NabhanilCh2513/status/1883104899761938877" type="twitter" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
                <Card 
                    title="Third One"
                    document="Good [morning/afternoon/evening], everyone.
                    Today, I am honored to speak about a topic that is shaping our future at an unprecedented rate—Artificial Intelligence (AI). AI is no longer a concept of science fiction; it is a reality that is transforming our daily lives, industries, and even the way we think. From self-driving cars to intelligent chatbots, AI is revolutionizing the world. But, like any technological advancement, it comes with its challenges."
                    type="document" 
                    shareIcon={<ShareIcon/>} 
                    deleteIcon={<DeletIcon/>}
                />
            </div>
        </div>
        
    </>
}