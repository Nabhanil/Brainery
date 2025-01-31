import { ReactElement } from "react";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { DocumentIcon } from "../Icons/ArticleIcon";


interface cardProp {
  title: string;
  type: string;
  shareIcon?: ReactElement;
  startIcon?: ReactElement;
  deleteIcon?: ReactElement;
  link?: string;
  tags?: string;
  document?:string
}

export const Card = ({ title, shareIcon, deleteIcon, link, tags, type,document }: cardProp) => {
  const getIcon = () => {
    switch (type) {
      case "youtube":
        return <YoutubeIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "article":
        return <DocumentIcon />;
      default:
        return null;
    }
  };


  return (
    <div className="border bg-gray-200 w-80 h-80 rounded-xl shadow-md flex flex-col">
      
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center">
          <div>{getIcon()}</div>
          <div className="text-2xl pl-2">{title}</div>
        </div>
        <div className="flex items-center ">
          <div className="cursor-pointer">{shareIcon}</div>
          <div className="pl-4 cursor-pointer">{deleteIcon}</div>
        </div>
      </div>

      
      <div className="flex justify-center items-center overflow-hidden  px-3">
        <div className="w-full h-full flex justify-center items-center">
          {type ==="youtube" && link && <iframe
            className="w-full h-50 rounded-lg"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>}
          {type==="twitter" && link && <div className="overflow-auto max-w-full max-h-50">
            <blockquote className="twitter-twitter w-full">

              <a title="twitter post" href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
            <blockquote className="twitter-tweet w-full"> <a title="x-post" href={link.replace("x.com","twitter.com")}></a>
            </blockquote>
            
          </div>
          }
          {type === "document" && <div className="bg-white px-2 py-1 rounded-md overflow-auto max-w-full max-h-50">
            {document}
            </div>}
        </div>
      </div>

      
      <div className="pt-3 text-center text-gray-600 text-sm">
        {tags ? `${tags}` : "No tags to show"}
      </div>
    </div>
  );
};
