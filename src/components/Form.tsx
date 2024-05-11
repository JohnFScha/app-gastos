import Input from "./Input"
import { calculatePercentage, calculateExpenses } from "../utils/functions"
import { useValueStore, useTotalStore } from "../store/store"

export default function Form({ title }: { title: string }) {
  const value = useValueStore((state) => state.value)
  const setValue = useValueStore((state) => state.change)
  const total = useTotalStore((state) => state.total)
  const setTotal = useTotalStore((state) => state.change)

  console.log('total: ', total)
  console.log('ingresos: ', value)

  return (
    <>
      {
        title.includes('Ingresos') ? (
          <form className="flex flex-col gap-5 items-center border-2 rounded-lg p-4 w-full lg:w-4/6 font-[400] hover:bg-slate-900 transition-all duration-200" onSubmit={(e) => calculatePercentage(e, setValue)}>
            <h2 className="text-lg">{title}</h2>
            <Input
              type='text'
              name='ingresos1'
              labelText="Martin"
              placeholder='Suba ingresos mensuales'
            />
            <Input
              type='text'
              name='ingresos2'
              labelText="Fran"
              placeholder='Suba ingresos mensuales'
            />
            <button type="submit" className="btn btn-accent w-1/3 xl:text-lg" >Calcular</button>
          </form>
        ) : (
          <form className="flex flex-col gap-5 items-center border-2 rounded-lg p-4 w-full lg:w-4/6 font-[400] hover:bg-slate-900 transition-all duration-200" onSubmit={(e) => calculateExpenses(e, setTotal, value[0])}>
            <h2 className="text-lg">{title}</h2>
            <Input
              type="number"
              name='gastos1'
              labelText="Martin"
              placeholder='Ingrese gastos'
            />
            <Input
              type="number"
              name='gastos2'
              labelText="Fran"
              placeholder='Ingrese gastos'
            />
            <button type="submit" className="btn btn-accent w-1/3 xl:text-lg" disabled={value.length === 0}>Calcular</button>
          </form>)}
    </>
  )
}

