import { WindowControls } from "#components/index.js";
import { Search } from "lucide-react";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import { useState } from "react";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedFavorite, setSelectedFavorite] = useState(
        locations.work.id,
    );

    const openItem = (item) => {
        if (item.kind === "folder") {
            setSelectedProject(item);
            setSelectedFavorite(null);
            setActiveLocation(locations.work);
            return;
        }

        if (item.fileType === "url" || item.fileType === "fig") {
            window.open(item.href, "_blank", "noopener,noreferrer");
            return;
        }

        if (item.fileType === "pdf") {
            openWindow("resume", item);
            return;
        }

        if (item.fileType === "txt") {
            openWindow("txtfile", item);
            return;
        }

        if (item.fileType === "img") {
            openWindow("imgfile", item);
        }
    };

    const selectLocation = (location) => {
        setSelectedFavorite(location.id);
        setSelectedProject(null);
        setActiveLocation(location);
    };

    const displayedLocation =
        selectedProject || activeLocation;

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>
            <div className="bg-white flex h-full">
                <div className="sidebar">
                    <div>
                        <h3>Favourites</h3>
                        <ul>
                            {Object.values(locations).map((item) => (
                                <li
                                    key={item.id}
                                    className={
                                        selectedFavorite === item.id
                                            ? "active"
                                            : "not-active"
                                    }
                                >
                                    <button
                                        type="button"
                                        onClick={() => selectLocation(item)}
                                    >
                                        <img src={item.icon} className="w-4" alt="" />
                                        <span className="text-sm font-medium truncate">
                                            {item.name}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Work</h3>
                        <ul>
                            {locations.work.children.map((project) => (
                                <li
                                    key={project.id}
                                    className={
                                        selectedProject?.id === project.id
                                            ? "active"
                                            : "not-active"
                                    }
                                >
                                    <button type="button" onClick={() => openItem(project)}>
                                        <img src={project.icon} className="w-4" alt="" />
                                        <span className="text-sm font-medium truncate">
                                            {project.name}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="content">
                    {displayedLocation?.children?.map((item) => (
                        <li
                            key={item.id}
                            className={item.position}
                        >
                            <button type="button" onClick={() => openItem(item)}>
                                <img src={item.icon} alt="" />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </div>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
