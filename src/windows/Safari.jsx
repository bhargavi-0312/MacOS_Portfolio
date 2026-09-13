import { WindowControls } from "#components/index.js";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import { blogPosts } from "#constants/index.js";
import { MoveRight } from "lucide-react";

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="safari"/>
            </div>
            <div className="blog">
                <h2> My Developer Blog</h2>
                <div className="space-y-8">
                    {blogPosts.map(({id,image,title,date,link})=>(
                        <div key={id} className="blog-post">
                            <div className="col-span-2">
                                <img src={image} alt={title}/>
                            </div>
                            <div className ="content">
                                <p>{date}</p>
                                <h3>{title}</h3>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    Check out the full post <MoveRight className="icon-hover"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const SafariWindow =WindowWrapper(Safari, 'safari');
export default SafariWindow
