import React from "react";
import "./BackgroundCanvas.css";


const BackgroundCanvas = (props) => {
    
    const canvasRef = React.useRef(null);

    React.useEffect(() => {

        const canvas = canvasRef.current;

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const ctx = canvas.getContext("webgl");

        if(ctx == null) {
            throw new Error("Canvas broke!");
        }
    
        draw(ctx);

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw(ctx);
        });
    });

    function draw(ctx) {
        ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);
    }

    return (
        <canvas className="cryptonate-background-canvas" ref={canvasRef}/>
    );
}
/*
class BackgroundCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    
    componentDidMount() {
        const ctx = this.canvasInit();
        this.draw(ctx);
    }

    componentWillUnmount() {
        // todo
    }

    draw(ctx) {
        ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);
    }

    canvasInit() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("webgl");

        if(ctx == null) {
            throw new Error("Canvas broke!");
        }

        React.useEffect(() => {
            window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                this.draw(ctx);
            }, false);
        });

        //canvas.width = this.props.window.width;
        //canvas.height = this.props.window.height;

        return ctx;
    }
    
    render() {
        return (
            <canvas className="cryptonate-background-canvas" ref={this.canvasRef}></canvas>
        )
    }
}*/

export default BackgroundCanvas;