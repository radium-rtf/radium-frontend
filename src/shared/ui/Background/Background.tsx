import Wave from "react-wavify"

const Background = () => <>
    <Wave
        fill={`rgba(0, 0, 0, 0.05)`}
        options={{
            amplitude: 80,
            speed: 0.10,
            points: 5,
            height: 100,
        }}
        style={{position: "fixed", zIndex: -1000, bottom: 0, height: 250, overflow: "visible"}}
    />

    <Wave
        fill={`rgba(0, 0, 0, 0.05)`}
        options={{
            amplitude: 100,
            speed: 0.15,
            points: 4,
            height: 100,
        }}
        style={{position: "fixed", zIndex: -1000, bottom: 0, height: 300, overflow: "visible"}}
    />
</>

export default Background