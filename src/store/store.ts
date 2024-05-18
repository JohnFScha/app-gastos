import { create } from 'zustand'

const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

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
  theme: boolean
  change: (to: boolean) => void
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
  theme: getCurrentTheme(),
  change: (to) => set((state) => ({ theme: state.theme = to })),
}))