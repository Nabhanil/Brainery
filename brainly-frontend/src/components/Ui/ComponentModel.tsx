import { useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input";

// @ts-ignore
export const ComponentModel = ({ open, setOpen }) => {
    const [formType , setFormType] = useState("")
    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center">
                    <div className="px-3 py-2 h-auto w-96 rounded-3xl bg-gray-200 shadow-lg">
                        <div  className="flex justify-end">
                            <span onClick={() => {setOpen(false); setFormType("")}} className="cursor-pointer "><CrossIcon /></span>
                            
                        </div>
                        <div className="flex px-2 justify-center items-center mb-2 py-1">
                            <Button variant="primary" size="sm" title="tweet" onClick={()=>setFormType("tweet")} className="rounded-xl"/>
                            <Button variant="primary" size="sm" title="youtube" onClick={()=>setFormType("youtube")} className="rounded-xl"/>
                            <Button variant="primary" size="sm" title="document" onClick={()=>setFormType("document")} className="rounded-xl"/>
                        </div>
                        <div className="flex justify-center">
                            {formType ==="tweet" && (
                                <div className="mt-2 mr-2 active">
                                    <form>
                                        <Input placeholder="title" />
                                        <Input placeholder="tweeter link" />
                                        <div className="flex justify-center ">
                                            <Button className="rounded-4xl" variant={"primary"} size="md" title="submit"/>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {formType ==="youtube" && (
                                <div className="mt-2 mr-2 active">
                                <form>
                                    <Input placeholder="title " />
                                    <Input placeholder="youtube link" />
                                    <div className="flex justify-center ">
                                        <Button className="rounded-4xl" variant={"primary"} size="md" title="submit"/>
                                    </div>
                                </form>
                            </div>
                            )}
                            {formType ==="document" && (
                                <div className="mt-2 mr-2 active">
                                    <h1>paste your document:</h1>
                                <form>
                                    <textarea title="document" className=" m-2 w-80 h-auto outline-none px-3 py-2 border-b-2 border-l shadow-2xs rounded-md"/>
                                    <Input placeholder="Reference Link(optional)" />
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
