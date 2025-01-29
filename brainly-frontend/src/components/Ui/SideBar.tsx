import { DocumentIcon } from "../Icons/ArticleIcon"
import { LogoIcon } from "../Icons/LogoIcon"
import { TwitterIcon } from "../Icons/TwitterIcon"
import { YoutubeIcon } from "../Icons/YoutubeIcon"

function SideBar() {
  return (
    <div className="w-72 bg-white  fixed h-screen">
        <div className="flex items-center justify-around cursor-pointer border-b-2 border-purple-500 pb-5 ">
            <LogoIcon/>
            <h1 className=" text-4xl text-purple-500 mr-2 font-extrabold">Brainery</h1>
        </div>
        <div>
            <div className="flex justify-evenly items-center  font-bold mx-2 my-5 text-2xl text-purple-400 hover:bg-gray-500 cursor-pointer active:bg-gray-500">
                <TwitterIcon/>
                <h1>Tweets </h1>
            </div>
            <div className="flex justify-evenly  items-center font-bold mx-2 my-5 text-2xl text-purple-400 hover:bg-gray-500 cursor-pointer active:bg-gray-500">
                <YoutubeIcon/>
                <h1>Videos</h1>
            </div>
            <div className="flex justify-evenly  items-center  font-bold mx-2 my-5 text-2xl text-purple-400 hover:bg-gray-500 cursor-pointer active:bg-gray-500"> 
                <DocumentIcon/>
                <h1>Docs</h1>
            </div>
        </div>
    </div>
  )
}

export default SideBar