import { FormEvent } from "react"
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content"
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

const MySwal = withReactContent(Swal)

export function calculatePercentage(theme: boolean, event: FormEvent<HTMLFormElement>, setValue: (to: number[]) => void, names: string[]) {
  event.preventDefault()
  const formData = new FormData(event?.currentTarget)

  const ingresos1 = Number(formData.get('ingresos1'))
  const ingresos2 = Number(formData.get('ingresos2'))

  const total = ingresos1 + ingresos2

  const percent1 = Math.round((ingresos1 * 100) / total)
  const percent2 = Math.round((ingresos2 * 100) / total)

  setValue([percent1, percent2])

  return MySwal.fire({
    icon: "success",
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)',
    title: <p className={theme ? "text-white" : "text-black"}>Porcentaje de aporte</p>,
    html: <div className={theme ? 'text-white' : 'text-black'}><p>{names[0]}: {percent1}%</p><br /><p>{names[1]}: ${percent2}%</p></div>,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: theme ? '#000029' : '#f1f1f1',
  })
}

export function calculateExpenses(theme: boolean, event: FormEvent<HTMLFormElement>, percent: number[], names: string[]) {
  event.preventDefault()
  const formData = new FormData(event?.currentTarget)

  const gastos1 = Number(formData.get('gastos1'))
  const gastos2 = Number(formData.get('gastos2'))

  let persona1: Person = {
    subtotal: Math.round((gastos1 * percent[1] / 100)),
    nombre: names[0],
    total: 0
  }
  let persona2: Person = {
    subtotal: Math.round((gastos2 * percent[0]) / 100),
    nombre: names[1],
    total: 0
  }

  const subtotal = persona1.subtotal < persona2.subtotal;

  persona2.total = persona2.subtotal - persona1.subtotal;
  persona1.total = persona1.subtotal - persona2.subtotal;

  return MySwal.fire({
    icon: "success",
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)',
    title: subtotal ? <div className={theme ? 'text-white' : 'text-black'}><p>{persona1.nombre} debe pagar a {persona2.nombre}: ${persona2.total}</p></div> : <div className={theme ? 'text-white' : 'text-black'}><p>{persona2.nombre} debe pagar a {persona1.nombre}: ${persona1.total}</p></div>,
    confirmButtonText: `Confirmar`,
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: theme ? '#000029' : '#f1f1f1',
  }).then((result) => {
    if (result.isConfirmed) {
      confetti.addConfetti()
    }
  })
}

export default async function alert(theme: boolean, setNames: (to: string[]) => void) {

  const { value: formValues } = await MySwal.fire({
    title: <p className={theme ? 'text-white' : 'text-black'}>¿Quienes van a repartir?</p>,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    html:
      <div>
        <div className="label">
          <label htmlFor="person1" className="label-text lg:text-xl">Persona 1</label>
        </div>
        <input id="swal-input1" name="person1" className="input input-bordered input-accent bg-base-100 text-slate-200 w-full p-2" placeholder="Nombre 1" autoComplete="given-name" type="text" />
        <div className="label">
          <label htmlFor="person2" className="label-text lg:text-xl">Persona 2</label>
        </div>
        <input id="swal-input2" name="person2" className="input input-bordered input-accent bg-base-100 text-slate-200 w-full p-2" placeholder="Nombre 2" autoComplete="given-name" type="text" />
      </div>,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: theme ? '#000029' : '#f1f1f1',
    preConfirm: () => {
      return [
        /* @ts-ignore Working as expected */
        document?.getElementById("swal-input1")?.value ?? undefined ? document?.getElementById("swal-input1")?.value : 'User 1',
        /* @ts-ignore  Working as expected */
        document?.getElementById("swal-input2")?.value ?? undefined ? document?.getElementById("swal-input2")?.value : 'User 2',
      ];
    }
  });

  if (formValues) {
    console.log(formValues)
    setNames(formValues)
  } 
}