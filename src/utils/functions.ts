import { FormEvent} from "react"
import Swal from 'sweetalert2'

export function calculatePercentage(event: FormEvent<HTMLFormElement>, setValue: (to: number[]) => void) {
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
    html: `<div><p>Martin: ${percent1}%</p><br /><p>Fran: ${percent2}%</p></div>`,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: 'rgb(15 23 42)',
    color: 'white',
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)'
  })
}

export function calculateExpenses(event: FormEvent<HTMLFormElement>, setTotal: (to: number[]) => void, percent: number) {
  event.preventDefault()
  const formData = new FormData(event?.currentTarget)
  
  const gastos1 = Number(formData.get('gastos1'))
  const gastos2 = Number(formData.get('gastos2'))

  console.log(percent)

  const total = gastos1 + gastos2

  const totalMartin = Math.round((total * percent) / 100)
  const totalFran = Math.round(total - totalMartin)

  setTotal([totalMartin, totalFran])

  Swal.fire({
    icon: "success",
    title: 'Pago de cada uno',
    html: `<div><p>Martin: $${totalMartin}</p> <p>Fran: $${totalFran}</p></div>`,
    confirmButtonText: 'confirmar',
    confirmButtonColor: 'oklch(74.51% 0.167 183.61 / 1)',
    background: 'rgb(15 23 42)',
    color: 'white',
    iconColor: 'oklch(74.51% 0.167 183.61 / 1)'
  })
}