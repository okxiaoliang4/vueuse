import type { UseSortCompareFn } from '../useSort'
import { useSortWrapFn } from '../useSort'

export function bubbleSort<T>(source: T[], compareFn: UseSortCompareFn<T>): T[] {
  const result: T[] = [...source]
  for (let i = 1; i < result.length; i += 1) {
    for (let j = 0; j < result.length - i; j += 1) {
      if (compareFn(result[j], result[j + 1]) > 0)
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
    }
  }
  return result
}

export const useBubbleSort = useSortWrapFn(bubbleSort)
