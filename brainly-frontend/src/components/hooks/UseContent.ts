import axios from "axios"
import { useEffect, useState } from "react"
import { BackendURL } from "../config"

export const useContent = ()=>{
    const [content , setContent] = useState([])
    useEffect(()=>{
        axios.get(`${BackendURL}/api/v1/fetch-content`,{
            headers:{
                "token":localStorage.getItem("token")
            }
        }).then(response=>{
            setContent(response.data.content)
        })
    },[])
    console.log(content)
    return content
}