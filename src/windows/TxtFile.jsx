import { WindowControls } from "#components/index.js";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const TxtFile = () => {
    const { windows } = useWindowStore();
    const file = windows.txtfile.data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{file?.name || "Text file"}</h2>
            </div>
            <article className="p-5 space-y-3 text-sm">
                {file?.subtitle && <h3 className="font-bold">{file.subtitle}</h3>}
                {file?.description?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </article>
        </>
    );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");
export default TxtFileWindow;
