import { create } from 'zustand'

interface Value {
  value: number[]
  change: (to: number[]) => void
}

interface Total {
  total: number[]
  change: (to: number[]) => void
}

export const useValueStore = create<Value>()((set) => ({
  value: [],
  change: (to) => set((state) => ({ value: state.value = to })),
}))

export const useTotalStore = create<Total>()((set) => ({
  total: [],
  change: (to) => set((state) => ({ total: state.total = to })),
}))