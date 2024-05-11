import Form from './components/Form'

function App() {

  return (
    <main className='min-h-screen flex flex-col justify-center items-center gap-5 p-10'>
      <h1 className='text-6xl font-[900] stroke-2'>Calculadora de loquis</h1>
      <section className='container flex flex-col items-center lg:flex-row border-2 p-10 rounded-xl gap-10'>
        <Form title='Ingresos' />
        <Form title='Gastos' />
      </section>
      <section className='container'>
        <label htmlFor="notes" className='label text-xl'>Notas</label>
        <textarea name="notes" id="notes" className='text-xl container textarea-bordered textarea textarea-accent min-h-[20vh]'></textarea>
      </section>
    </main>
  )
}

export default App
