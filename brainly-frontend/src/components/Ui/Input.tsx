interface inputProps {
    placeholder:string
    referrance?:any
}

export const Input = ({placeholder ,referrance}:inputProps)=>{
    return <input ref={referrance} placeholder={placeholder}  className="px-3 w-full py-2 mt-2 mb-2 outline-none rounded-3xl border-b-2 border-l" />
}