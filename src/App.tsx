import Form from './components/Form'
import loki from './assets/loki.mp3'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useNameStore } from './store/store';
import alert from './utils/functions';
import useThemeDetector from './hooks/useSystemTheme';

function App() {
  const [playing, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const names = useNameStore((state) => state.names)
  const setNames = useNameStore((state) => state.change)
  const theme = useThemeDetector()

  const easterEgg = names.includes('Martin') && names.includes('Fran');

  useEffect(() => {
    if (names.length === 0) {
      alert(theme, setNames)
    } 
  }, [theme, names]);

  const audioPlayer = (ref: MutableRefObject<HTMLAudioElement | null>) => {
    console.log(ref)
    if (ref?.current?.paused) {
      ref.current.play()
      setIsPlaying(true)
    } else {
      ref?.current?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <main className='min-h-screen flex flex-col justify-center items-center gap-5 p-5'>
      <h1 className='text-2xl xl:text-6xl font-[900] stroke-2 border-2 container text-center p-5 bg-base-200 hover:bg-base-300 transition duration-200 rounded-xl'>Calculadora de {easterEgg ? 'loquis' : 'gastos'}</h1>
      <section className='container flex flex-col items-center lg:flex-row border-2 p-5 xl:p-10 rounded-xl gap-10'>
        <Form title='Ingresos' names={names} />
        <Form title='Gastos' names={names} />
      </section>
      <section className='container'>
        <label htmlFor="notes" className='label text-xl font-semibold'>Notas</label>
        <textarea name="notes" id="notes" className='text-xl container textarea-bordered textarea bg-base-200 textarea-accent min-h-[20vh]'></textarea>
      </section>

      <section className='flex flex-col gap-5 fixed bottom-[2%] xl:top-[5%] right-[1%]'>
        {easterEgg && (
          <button type="button" className='btn btn-circle btn-accent size-[60px]' onClick={() => audioPlayer(audioRef)}>
            {playing ? (<FaPause className='text-xl' />) : (<FaPlay className='text-xl' />)}
            <p className='sr-only'>play</p>
            <audio src={loki} ref={audioRef}></audio>
          </button>
        )}
      </section>
    </main>
  )
}

export default App
