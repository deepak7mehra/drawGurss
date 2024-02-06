import { useEffect, useState } from "react";
import { useRef } from "react"
import io from 'socket.io-client';

var socket = io("http://localhost:3000");

export default function Board() {

   
    const ref =  useRef(null);
    var canvasPressed = false;
    var canvasPressed2 = false;
    var ctx;
    

    

    useEffect(()=>{
        ctx = ref.current.getContext("2d");
        ctx.lineWidth = 2;
        
        
    },[]);

    useEffect(()=>{
        socket.on("clientDraw",(data)=>{
                
                if (canvasPressed2){
                    ctx.lineTo(data.x, data.y);
                    ctx.stroke();
                

                }
                
        });


        socket.on("clientDown",(data)=>{
            canvasPressed2 = true;
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
        })

        socket.on("clientUp",(data)=>{
            canvasPressed2 = false;
        })

        socket.on("changeEraser",(data)=>{
            ctx.lineWidth = 13;
            ctx.strokeStyle = "white";
        });

        socket.on("changePencil",(data)=>{
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

        })

        
    },[socket])

    
    function handleMouseDown(evt){

        
        canvasPressed = true;
        ctx.beginPath();
        ctx.moveTo(evt.clientX, evt.clientY);
        socket.emit("mouseD",{x:evt.clientX, y:evt.clientY})
    }

    function handleMouseUp(evt){
        console.log('event mouseup', evt);
        canvasPressed = false;
        socket.emit("mouseU","down")
    }

    function handleMouseMove(evt){
        console.log("mouse move has been done")
        if (canvasPressed) {
            ctx.lineTo(evt.clientX, evt.clientY);
            ctx.moveTo(evt.clientX, evt.clientY);
            ctx.stroke();
            socket.emit("draw",{x:evt.clientX,y:evt.clientY});
        }
    }

    function handleEraser(){
        ctx.lineWidth = 13;
        ctx.strokeStyle = "white";
        socket.emit("erase","change to eraser");

    }

    function handlePencil(){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        socket.emit("pencil","change to pencil")

    }

    
  return (
    <>
    <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="border-2 border-black" ref={ref} width="500" height="500" >
        hi there
    </canvas>

    <div className="flex gap-5 p-5">

    <button onClick={handleEraser} >eraser</button>
    <button onClick={handlePencil} >pencil</button>
    </div>
    

    </>
  )
}
