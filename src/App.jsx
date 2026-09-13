import { Navbar, Welcome, Dock, Home } from "#components";
import {gsap } from 'gsap';
import {Draggable} from "gsap/draggable";
import {
    Safari,
    Terminal,
    Resume,
    Finder,
    TxtFile,
    ImgFile,
    Contact,
    Photos,
} from "#windows";

gsap.registerPlugin(Draggable);
const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Home />
            <Dock />
            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <TxtFile />
            <ImgFile />
            <Contact />
            <Photos />
        </main>
    )
};
export default App;
