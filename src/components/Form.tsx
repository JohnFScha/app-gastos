import Input from "./Input"
import { calculatePercentage, calculateExpenses } from "../utils/functions"
import { useValueStore } from "../store/store"
import useThemeDetector from "../hooks/useSystemTheme"
import { useEffect } from "react"

export default function Form({ title, names }: { title: string, names: string[] }) {
  const value = useValueStore((state) => state.value)
  const setValue = useValueStore((state) => state.change)
  const theme = useThemeDetector()

  return (
    <>
      {
        title.includes('Ingresos') ? (
          <form className="flex flex-col gap-5 items-center border-2 rounded-lg p-4 w-full lg:w-4/6 font-[400] hover:bg-base-200 transition-all duration-200" onSubmit={(e) => calculatePercentage(theme, e, setValue, names)}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <Input
              type='number'
              name='ingresos1'
              labelText={names[0]}
              placeholder='Suba ingresos mensuales'
            />
            <Input
              type='number'
              name='ingresos2'
              labelText={names[1]}
              placeholder='Suba ingresos mensuales'
            />
            <button type="submit" className="btn btn-accent w-full lg:w-1/3 xl:text-lg" >Calcular</button>
          </form>
        ) : (
          <form className="flex flex-col gap-5 items-center border-2 rounded-lg p-4 w-full lg:w-4/6 font-[400] hover:bg-base-200 transition-all duration-200" onSubmit={(e) => calculateExpenses(theme, e, value, names)}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <Input
              type="number"
              name='gastos1'
              labelText={names[0]}
              placeholder='Ingrese gastos'
            />
            <Input
              type="number"
              name='gastos2'
              labelText={names[1]}
              placeholder='Ingrese gastos'
            />
            <button type="submit" className="btn btn-accent w-full lg:w-1/3 xl:text-lg" disabled={value.length === 0}>Calcular</button>
          </form>)}
    </>
  )
}

