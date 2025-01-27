import { ReactElement } from "react"

interface buttonstyles{
    variant : "primary" | "secondary",
    size:"lg"| "md"| "sm"
    onClick?: ()=> void
    title: string
    startIcon?: ReactElement
}


const variantStyles ={
    primary: "bg-purple-500 text-white",
    secondary:"bg-purple-200 text-purple-400"
}

const sizeStyles = {
    lg:"px-8 py-4",
    md:"px-4 py-2",
    sm:"px-2 py-1"
}

const defaultStyles = "rounded-md mx-2 mt-4 text-2xl"

export const Button = ({variant, size,onClick, title, startIcon}: buttonstyles)=>{

    return <button onClick={()=>onClick} className={`${variantStyles[variant]} ${sizeStyles[size]} ${defaultStyles}`} >
        <div className="flex justify-center items-center ">
            <div className="pr-2">{startIcon}</div>
            <div>{title}</div>
        </div>
        
        
        </button>
}