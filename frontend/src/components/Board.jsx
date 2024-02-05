import { useEffect } from "react";
import { useRef } from "react"


export default function Board() {
    const ref =  useRef(null);
    var canvasPressed = false;
    var ctx;

    

    useEffect(()=>{
        ctx = ref.current.getContext("2d");
        
    },[])

    /* ref.current.addEventListener('mousedown', function (evt) {
        console.log('event mousedown', evt);
        canvasPressed = true;
        ctx.beginPath();
        ctx.moveTo(evt.clientX, evt.clientY);
    }); */
    function handleMouseDown(evt){

        console.log("mouse down has been activated");
        canvasPressed = true;
        const a = ctx.beginPath();
        ctx.moveTo(evt.clientX, evt.clientY);
        console.log(evt.clientX,evt.clientY)
    }

    function handleMouseUp(evt){
        console.log('event mouseup', evt);
        canvasPressed = false;
    }

    function handleMouseMove(evt){
        console.log("mouse move has been done")
        if (canvasPressed) {
            ctx.lineTo(evt.clientX, evt.clientY);
            ctx.moveTo(evt.clientX, evt.clientY);
            ctx.stroke();
          }
    }

  return (
    <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="border-2 border-black" ref={ref} width="500" height="500" >
        hi there
    </canvas>
  )
}
