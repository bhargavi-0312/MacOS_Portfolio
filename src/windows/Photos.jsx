import { useMemo, useState } from "react";
import { WindowControls } from "#components/index.js";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import { gallery, locations, photosLinks } from "#constants/index.js";
import useWindowStore from "#store/window.js";

const aboutPhotos = locations.about.children
    .filter((item) => item.fileType === "img")
    .map((item) => ({
        id: `about-${item.id}`,
        name: item.name,
        img: item.imageUrl,
    }));

const libraryPhotos = gallery.map((photo) => ({
    ...photo,
    name: `Gallery photo ${photo.id}`,
}));

const photoCollections = {
    Library: libraryPhotos,
    Memories: [...libraryPhotos, ...aboutPhotos],
    Places: libraryPhotos,
    People: aboutPhotos,
    Favorites: [libraryPhotos[0], ...aboutPhotos.slice(0, 1)],
};

const Photos = () => {
    const [activeCollection, setActiveCollection] = useState("Library");
    const { openWindow } = useWindowStore();
    const photos = useMemo(
        () => photoCollections[activeCollection] || [],
        [activeCollection],
    );

    const openPhoto = (photo) => {
        openWindow("imgfile", {
            name: photo.name,
            imageUrl: photo.img,
        });
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Photos</h2>
            </div>
            <div className="bg-white flex h-full">
                <aside className="sidebar">
                    <h2>Library</h2>
                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li
                                key={id}
                                className={
                                    activeCollection === title ? "active" : ""
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() => setActiveCollection(title)}
                                >
                                    <img src={icon} alt="" />
                                    <p>{title}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="gallery">
                    <ul>
                        {photos.map((photo) => (
                            <li key={photo.id}>
                                <button
                                    type="button"
                                    onClick={() => openPhoto(photo)}
                                    aria-label={`Open ${photo.name}`}
                                >
                                    <img src={photo.img} alt={photo.name} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
