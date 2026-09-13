import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2> Resume.pdf</h2>
                <a href="files/resume.pdf" download className="cursor-pointer"
                title="Download resume">
                    <Download className="icon"/>
                </a>
            </div>
            <iframe
                src="/files/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit"
                title="Resume PDF"
                className="block w-full h-full border-0"
            />
        </>
    )
}
const ResumeWindow= WindowWrapper(Resume,'resume');
export default ResumeWindow
