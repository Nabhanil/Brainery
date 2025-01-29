interface inputProps {
    placeholder:string
    onChange?:()=> void
}

export const Input = ({placeholder, onChange}:inputProps)=>{
    return <input placeholder={placeholder} onChange={onChange} className="px-3 w-full py-2 mt-2 mb-2 outline-none rounded-3xl border-b-2 border-l" />
}