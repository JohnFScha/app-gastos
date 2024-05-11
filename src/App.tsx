import Form from './components/Form'
import loki from './assets/loki.mp3'
import { useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

function App() {
  const [playing, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audio = audioRef?.current

  console.log(audio) 

  const audioPlayer = () => {
    if (audio?.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio?.pause()
      setIsPlaying(false)
    }
  } 

  return (
    <main className='min-h-screen flex flex-col justify-center items-center gap-5 p-5 xl:p-10'>
      <h1 className='text-3xl xl:text-6xl font-[900] stroke-2'>Calculadora de loquis</h1>
      <section className='container flex flex-col items-center lg:flex-row border-2 p-5 xl:p-10 rounded-xl gap-10'>
        <Form title='Ingresos' />
        <Form title='Gastos' />
      </section>
      <section className='container'>
        <label htmlFor="notes" className='label text-xl font-semibold'>Notas</label>
        <textarea name="notes" id="notes" className='text-xl container textarea-bordered textarea textarea-accent border-white min-h-[20vh]'></textarea>
      </section>
      <button className='btn btn-circle btn-accent fixed bottom-[2%] xl:top-[5%] right-[2%] size-[60px]' onClick={audioPlayer}>
        {playing ? (<FaPause className='text-xl' />) : (<FaPlay />)}
        <audio src={loki} ref={audioRef}></audio>
      </button>
    </main>
  )
}

export default App
