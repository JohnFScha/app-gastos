import { create } from 'zustand'

interface Value {
  value: number[]
  change: (to: number[]) => void
}

interface Total {
  total: number[]
  change: (to: number[]) => void
}

interface Names {
  names: string[]
  change: (to: string[]) => void
}

interface Theme {
  theme: string
  change: (to: string) => void
}

export const useValueStore = create<Value>()((set) => ({
  value: [],
  change: (to) => set((state) => ({ value: state.value = to })),
}))

export const useTotalStore = create<Total>()((set) => ({
  total: [],
  change: (to) => set((state) => ({ total: state.total = to })),
}))

export const useNameStore = create<Names>()((set) => ({
  names: [],
  change: (to) => set((state) => ({ names: state.names = to })),
}))

export const useThemeStore = create<Theme>()((set) => ({
  theme: "dark",
  change: (to) => set((state) => ({ theme: state.theme = to })),
}))