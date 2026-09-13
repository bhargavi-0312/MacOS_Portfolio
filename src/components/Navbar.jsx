import dayjs from "dayjs";
import { dockApps, navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window.js";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchPanelRef = useRef(null);
    const searchButtonRef = useRef(null);

    const searchResults = dockApps.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );

    const openSearchResult = (app) => {
        if (app.action === "close-all") return;

        openWindow(app.id);
        setSearchQuery("");
        setIsSearchOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                isSearchOpen &&
                searchPanelRef.current &&
                !searchPanelRef.current.contains(event.target) &&
                !searchButtonRef.current?.contains(event.target)
            ) {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isSearchOpen]);

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">Bhargavi's Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id}>
                            <button type="button" onClick={() => openWindow(type)}>
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            {img === "/icons/search.svg" ? (
                                <button
                                    ref={searchButtonRef}
                                    type="button"
                                    className="icon"
                                    aria-label="Search dock apps"
                                    onClick={() => {
                                        setIsSearchOpen((open) => !open);
                                        setSearchQuery("");
                                    }}
                                >
                                    <img src={img} className="icon-hover" alt="" />
                                </button>
                            ) : img === "/icons/user.svg" ? (
                                <button
                                    type="button"
                                    className="icon"
                                    aria-label="Contact Me"
                                    onClick={() => openWindow("contact")}
                                >
                                    <img src={img} className="icon-hover" alt="" />
                                </button>
                            ) : (
                                <img src={img} className="icon-hover" alt={`icon-${id}`} />
                            )}
                        </li>
                    ))}
                </ul>
                {isSearchOpen && (
                    <div ref={searchPanelRef} className="navbar-search">
                        <input
                            autoFocus
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search Portfolio, Articles, Gallery..."
                            aria-label="Search dock apps"
                        />
                        {searchQuery.trim() && (
                            <ul>
                                {searchResults.length > 0 ? (
                                    searchResults.map((app) => (
                                        <li key={app.id}>
                                            <button
                                                type="button"
                                                onClick={() => openSearchResult(app)}
                                            >
                                                {app.name}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="empty">No matching apps</li>
                                )}
                            </ul>
                        )}
                    </div>
                )}
                <time>
                    {dayjs().format("ddd MMM D h:mm A")}

                </time>
            </div>
        </nav>
    );
};
export default Navbar;
