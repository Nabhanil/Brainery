import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input";
import axios from "axios";
import { BackendURL } from "../config";


// @ts-ignore
export const ComponentModel = ({ open, setOpen }) => {
    const [type , setType] = useState("")
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const tagRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    const youtubeContent = async (e:any) =>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        const tag = tagRef.current?.value

        try {
            const result = await axios.post(`${BackendURL}/api/v1/content`,{
                title,link,tag,type
            },{
                headers:{
                    token
                }
            })
            console.log(result.data.response)
            if(result.data.response._id){
                setOpen(false)
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    const twitterContent = async (e:any) =>{``
        e.preventDefault()
        const token = localStorage.getItem("token")
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        const tag = tagRef.current?.value

        try {
            const result = await axios.post(`${BackendURL}/api/v1/content`,{
                title,link,tag,type
            },{
                headers:{
                    token
                }
            })
            console.log(result.data.response)
            if(result.data.response._id){
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center">
                    <div className="px-3 py-2 h-auto w-96 rounded-3xl bg-gray-200 shadow-lg">
                        <div  className="flex justify-end">
                            <span onClick={() => {setOpen(false); setType("")}} className="cursor-pointer "><CrossIcon /></span>
                            
                        </div>
                        <div className="flex px-2 justify-center items-center mb-2 py-1">
                            <Button variant={type== "twitter" ? "primary": "secondary"} size="sm" title="twitter" onClick={()=>setType("twitter")} className="rounded-xl"/>
                            <Button variant={type == "youtube" ? "primary": "secondary"} size="sm" title="youtube" onClick={()=>setType("youtube")} className="rounded-xl"/>
                            <Button variant={type == "document" ? "primary": "secondary"} size="sm" title="document" onClick={()=>setType("document")} className="rounded-xl"/>
                        </div>
                        <div className="flex justify-center text-black">
                            {type ==="twitter" && (
                                <div className="mt-2 mr-2 active">
                                    <form  onSubmit={(e)=>twitterContent(e)}>
                                        <Input referrance={titleRef} placeholder="title" />
                                        <Input referrance={linkRef} placeholder="twitterer link" />
                                        <Input referrance={tagRef} placeholder="tags" />
                                        <div className="flex justify-center ">
                                            <Button  className="rounded-4xl" variant={"primary"} size="md" title="submit"/>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {type ==="youtube" && (
                                <div className="mt-2 mr-2 active">
                                <form onSubmit={(e)=>youtubeContent(e)}>
                                    <Input referrance={titleRef} placeholder="title " />
                                    <Input referrance={linkRef} placeholder="youtube link" />
                                    <Input referrance={tagRef} placeholder="tags" />
                                    <div className="flex justify-center ">
                                        <Button className="rounded-4xl" variant={"primary"} size="md" title="submit"/>
                                    </div>
                                </form>
                            </div>
                            )}
                            {type ==="document" && (
                                <div className="mt-2 mr-2 active">
                                    <h1>paste your document:</h1>
                                <form>
                                    <textarea ref={textareaRef} title="document" className=" m-2 w-80 h-auto outline-none px-3 py-2 border-b-2 border-l shadow-2xs rounded-md"/>
                                    <Input placeholder="Reference Link(optional)" />
                                    <Input referrance={tagRef} placeholder="tags" />
                                    <div className="flex justify-center ">
                                        <Button className="rounded-4xl" variant={"primary"} size="md" title="submit"/>
                                    </div>
                                </form>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
