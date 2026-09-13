import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const Home = () => {
    const folderRefs = useRef([]);
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    useEffect(() => {
        const draggables = folderRefs.current
            .filter(Boolean)
            .map((folder) =>
                Draggable.create(folder, {
                    type: "x,y",
                    bounds: "#home",
                    edgeResistance: 0.85,
                    onPress() {
                        folder.classList.add("is-dragging");
                    },
                    onRelease() {
                        folder.classList.remove("is-dragging");
                    },
                })[0],
            );

        return () => draggables.forEach((draggable) => draggable.kill());
    }, []);

    const openProject = (project) => {
        setActiveLocation(locations.work);
        openWindow("finder", project);
    };

    return (
        <section id="home" aria-label="Desktop folders">
            <ul>
                {locations.work.children.map((project, index) => (
                    <li
                        key={project.id}
                        ref={(folder) => {
                            folderRefs.current[index] = folder;
                        }}
                        className={project.position}
                    >
                        <button
                            type="button"
                            onClick={() => openProject(project)}
                            aria-label={`Open ${project.name}`}
                        >
                            <img src={project.icon} alt="" />
                            <p>{project.name}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
