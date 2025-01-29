import { useState } from "react"
import { DeletIcon } from "../Icons/DeleteIcon"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Button } from "./Button"
import { Card } from "./Card"
import { ComponentModel } from "./ComponentModel"

export const Dashboard = ()=>{
    const [open,setOpen] = useState(false)
    return <>
        <ComponentModel open={open} setOpen={setOpen}/>
        <div className="flex justify-between">
            <h1 className="font-bold text-4xl p-3 m-2">All of your brains here:</h1>
            <div>
                <Button onClick={()=>{setOpen(true)}} title ="Add Content" size="md"  variant="primary" startIcon={<PlusIcon/>} className="rounded-md " />
                <Button title ="Share Brain" size="md" variant="secondary" startIcon={<ShareIcon/>} className="rounded-md"/>
            </div>
        </div>
        <div className="flex flex-wrap gap-x-2.5 p-5 ">
            <Card tags="#life" title="First One" link="https://www.youtube.com/watch?v=Q9OW4iaQl-k" type="youtube" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
            <Card title="Second One" link="https://x.com/NabhanilCh2513/status/1883104899761938877" type="twitter" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
        </div>
        
    </>
}