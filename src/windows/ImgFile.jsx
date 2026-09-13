import { WindowControls } from "#components/index.js";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const ImgFile = () => {
    const { windows } = useWindowStore();
    const file = windows.imgfile.data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <p>{file?.name || "Image preview"}</p>
            </div>
            <div className="preview">
                <img src={file?.imageUrl} alt={file?.name || "Preview"} />
            </div>
        </>
    );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");
export default ImgFileWindow;
