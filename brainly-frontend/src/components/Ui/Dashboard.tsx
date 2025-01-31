import {   useState } from "react"
import { DeletIcon } from "../Icons/DeleteIcon"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Button } from "./Button"
import { Card } from "./Card"
import { ComponentModel } from "./ComponentModel"
import SideBar from "./SideBar"
import { useContent } from "../hooks/UseContent"


export const Dashboard = ()=>{
    const [open,setOpen] = useState(false)
    const content = useContent()

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mx-6">
                    {content.length > 0 ? (
                        content.map(({ type, title, link, tag, _id }) => (
                            <Card 
                                key={_id} 
                                tags={tag} 
                                title={title} 
                                link={link} 
                                type={type} 
                                shareIcon={<ShareIcon />} 
                                deleteIcon={<DeletIcon />} 
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">No content available yet.</p>
                    )}
                </div>
        </div>
        
    </>
}