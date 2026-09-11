import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetters = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `"wght" ${weight}`,
        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(
                mouseX - (l - left + w / 2)
            );

            const intensity = Math.exp(-(distance ** 2) / 20000);

            animateLetters(
                letter,
                min + (max - min) * intensity
            );

            gsap.to(letter, {
                duration: 0.25,
                filter: `brightness(${1 + intensity * 0.5})`,
            });
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) =>
            animateLetters(letter, base, 0.3)
        );
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(
            titleRef.current,
            "title"
        );

        const subtitleCleanup = setupTextHover(
            subtitleRef.current,
            "subtitle"
        );

        return () => {
            subtitleCleanup();
            titleCleanup();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText(
                    "Hey , I'm Bhargavi ! Welcome to my ",
                    "text-3xl font-georama drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]",
                    700
                )}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText(
                    "Portfolio",
                    "text-8xl italic font-georama",
                    400
                )}
            </h1>

            <div className="small-screen">
                <p>
                    This PortFolio is Designed for Desktop/Tablet screens only.
                </p>
            </div>
        </section>
    );
};

export default Welcome;