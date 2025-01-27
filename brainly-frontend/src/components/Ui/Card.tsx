import { ReactElement } from "react"
import { YoutubeIcon } from "../Icons/YoutubeIcon"
import { TwitterIcon } from "../Icons/TwitterIcon"
import { ArticleIcon } from "../Icons/ArticleIcon"

interface cardProp{
    title:string
    type:string
    shareIcon?: ReactElement
    startIcon?: ReactElement
    deleteIcon?: ReactElement
    link:string
    tags?:string
}





export const Card = ({title,shareIcon,deleteIcon,link,tags,type}:cardProp)=>{

    const getIcon = ()=>{
        switch (type) {
            case "youtube":
                return <YoutubeIcon/>
            case "twitter":
                return <TwitterIcon/>
            case "article":
                return <ArticleIcon/>
            default:
                break;
        }
    }

    const getLink = (link:string)=>{
        switch (type) {
            case "youtube":
                return <iframe  src={link.replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
            case "twitter":
                return  <blockquote className="twitter-tweet">
                    <a title="post" href={link.replace("x.com","twitter.com")}></a> 
                </blockquote> 
            case "article":
                return <ArticleIcon/>
            default:
                break;
        }
    }
    
    return <div className="border bg-gray-200 max-w-80 rounded-xl">
        <div className="flex justify-between items-center p-5">
            <div className="flex justify-center items-center">
                <div>{getIcon()}</div>
                <div className="text-2xl pl-2">{title}</div>
            </div>
            <div className="flex justify-center items-center">
                <div>{shareIcon}</div>
                <div className="pl-4">{deleteIcon}</div>
            </div>
        </div>
        <div className="flex justify-center items-center overflow-auto">
            <div className="">      
                {getLink(link)}
                     
            </div>
        </div>
        <div className="pt-3">
            {tags}
        </div>
    </div>
}