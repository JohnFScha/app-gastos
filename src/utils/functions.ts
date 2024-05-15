import { FormEvent } from "react"
import Swal from 'sweetalert2'
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

export function calculatePercentage(event: FormEvent<HTMLFormElement>, setValue: (to: number[]) => void, names: string[]) {
  event.preventDefault()
  const formData = new FormData(event?.currentTarget)

  const ingresos1 = Number(formData.get('ingresos1'))
  const ingresos2 = Number(formData.get('ingresos2'))

  const total = ingresos1 + ingresos2

  const percent1 = Math.round((ingresos1 * 100) / total)
  const percent2 = Math.round((ingresos2 * 100) / total)

  setValue([percent1, percent2])

  Swal.fire({
    icon: "success",
    title: 'Porcentaje de aporte',
    html: `<div><p>${names[0]}: ${percent1}%</p><br /><p>${names[1]}: ${percent2}%</p></div>`,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: 'rgb(15 23 42)',
    color: 'white',
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)'
  })
}

export function calculateExpenses(event: FormEvent<HTMLFormElement>, percent: number[], names: string[]) {
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
 
  persona2.total = persona2.subtotal - persona1.subtotal 
  persona1.total = persona1.subtotal - persona2.subtotal;

  Swal.fire({
    icon: "success",
    title: `${subtotal ? `<div><p>${persona1.nombre} debe pagar a ${persona2.nombre}: $${persona2.total}</p></div>` : `<div><p>${persona2.nombre} debe pagar a ${persona1.nombre}: $${persona1.total}</p></div>`}`,
    confirmButtonText: `Confirmar`,
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: 'rgb(15 23 42)',
    color: 'white',
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)'
  }).then((result) => {
    if (result.isConfirmed) {
      confetti.addConfetti()
    }
  })
}

export default async function alert(setNames: (to: string[]) => void) {

  const { value: formValues } = await Swal.fire({
    title: "¿Quienes van a repartir?",
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: 'rgb(15 23 42)',
    color: 'white',
    html: `
      <div class="">
        <div class="label">
          <label htmlFor="person1" class="label-text lg:text-xl">Persona 1</label>
        </div>
        <input id="swal-input1" name="person1" class="input input-accent w-full p-2" placeholder="Nombre 1" autocomplete="Martin" type="text">
        <div class="label">
          <label htmlFor="person2" class="label-text lg:text-xl">Persona 2</label>
        </div>
        <input id="swal-input2" name="person2" class="input input-accent w-full p-2" placeholder="Nombre 2" autocomplete="Fran" type="text">
      </div>
    `,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: () => {
      return [
        /* @ts-ignore Working as expected */
        document?.getElementById("swal-input1")?.value,
        /* @ts-ignore  Working as expected */
        document?.getElementById("swal-input2")?.value
      ];
    }
  });

  if (formValues) {
    setNames(formValues)
  }
}