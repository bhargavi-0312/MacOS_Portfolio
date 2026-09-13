import { WindowControls } from "#components/index.js";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import { socials } from "#constants/index.js";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>
            <div className="contact-content">
                <img
                    src="/images/adrian.jpg"
                    alt="Profile"
                    className="contact-avatar"
                />
                <h3>Let's Connect</h3>
                <p>Got an idea? A bug to squash? Or just wanna talk? I'm in.</p>
                <ul>
                    {socials.map(({ id, text, icon, bg, link }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={icon} alt="" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
