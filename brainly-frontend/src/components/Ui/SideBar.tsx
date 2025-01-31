import { DocumentIcon } from "../Icons/ArticleIcon";
import { LogoIcon } from "../Icons/LogoIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";

function SideBar() {
  return (
    <div className="w-72 bg-white fixed h-screen shadow-lg border-r border-gray-300">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 ">
        <LogoIcon />
        <h1 className="text-4xl text-purple-500 mr-2 font-extrabold">Brainery</h1>
      </div>

      {/* Navigation Section */}
      <div className="mt-4">
        <NavItem icon={<TwitterIcon />} text="Tweets" />
        <NavItem icon={<YoutubeIcon />} text="Videos" />
        <NavItem icon={<DocumentIcon />} text="Docs" />
      </div>
    </div>
  );
}

/** Extracted NavItem Component */
const NavItem = ({ icon, text }: { icon: JSX.Element; text: string }) => {
  return (
    <div className="flex items-center space-x-4 text-lg font-semibold text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-all duration-200 cursor-pointer py-3 px-6 rounded-xl mx-3">
      {icon}
      <h1>{text}</h1>
    </div>
  );
};

export default SideBar;
