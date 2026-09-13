import useWindowStore from "#store/window.js";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            if (!isOpen || !ref.current) return;

            const header = ref.current.querySelector("#window-header");
            if (!header) return;

            const [draggable] = Draggable.create(ref.current, {
                trigger: header,
                type: "x,y",
                onPress: () => focusWindow(windowKey),
            });

            return () => draggable.kill();
        }, { dependencies: [isOpen, focusWindow] });

        if (!isOpen) return null;

        return(
            <section id={windowKey} ref={ref} style={{ zIndex }}
                     className="absolute"
                     onMouseDown={() => focusWindow(windowKey)}>
                <Component {...props}/>
            </section>
        )
    }

    Wrapped.displayName=`WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;