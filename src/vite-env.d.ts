/// <reference types="vite/client" />

type InputProps<T> = {
  type: T, 
  name: T, 
  labelText: T, 
  placeholder: T
}

type Person = {
  nombre: string
  subtotal: number
  total: number | undefined
}