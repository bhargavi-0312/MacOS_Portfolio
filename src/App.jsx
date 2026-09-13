import {Navbar , Welcome ,Dock } from "#components";
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
} from "#windows";

gsap.registerPlugin(Draggable);
const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />
            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <TxtFile />
            <ImgFile />
            <Contact />
        </main>
    )
};
export default App;
