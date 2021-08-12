import React,{useState,useEffect} from 'react'
import './App.css'



const audioClip = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  




const App = ()=>{

    const[volume,setVolume] = useState(1)
    const[playing,setPlaying]= useState("")
     
    const currentPlaying=(e)=>{
        setPlaying(e)
    }

    return (
        <div className="container-fluid">
        <h1 className="text-center">Drum Machine</h1>
            <div className="drum-box row">
                <div className="key-box col-md-7 my-3 ">
                <div className="row">
                    {audioClip.map((clip)=>{
                       return <Pad clip={clip} key={clip.id} volume={volume} currentPlaying={currentPlaying}/>
                    })}
                    
                </div>
                </div>
                <div className="col-md-4">
                <h4 className="my-3 text-center">Volume</h4>
                <input type="range" name="volume" id="volume" step="0.01" min="0" max="1" value={volume} className="" onChange={(e)=>setVolume(e.target.value)}/>
                <h4 className="my-3 text-center">Now Playing</h4>
                <p className="text-center h3">{playing}</p>
                </div>

            </div>
        </div>
    )

}


const Pad=({clip,volume,currentPlaying})=>{
    const [active,setActive ] = useState(false)

    useEffect(()=>{
        document.addEventListener('keydown',handleKeypress)
        return ()=>{
            document.removeEventListener('keydown',handleKeypress)
        }
    },[])

    const handleKeypress = (e)=>{
        if(e.keyCode === clip.keyCode){
            playSound();
        }
    }


    const playSound=()=>{
        const audioTag = document.getElementById(clip.keyTrigger)
        setActive(true)
        currentPlaying(clip.id)
        audioTag.volume = volume;
        setTimeout(()=>setActive(false),200)
        audioTag.currentTime=0;
        audioTag.play();
    }

    return(
        <div className={`key col-md-4 btn btn-secondary ${active && "btn-warning"}`} onClick={playSound}>
            <audio src={clip.url} id={clip.keyTrigger}></audio>
            {clip.keyTrigger}
        </div>
    )
}

export default App