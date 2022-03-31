import { useState } from "react";

export const Slider = () => {
    const [slider, setSlider] = useState<string>("0");
    
    return (
        <div className="slidecontainer">
        <input type="range" min="1" max="100" value={slider} className="slider" id="myRange" onChange={(e) => {
            console.log("e", e);
            setSlider(e.target.value)
        }} />
    </div>
    )
}