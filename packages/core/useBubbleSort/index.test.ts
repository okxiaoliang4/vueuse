import { unref } from 'vue'
import { useBubbleSort } from '.'

interface User {
  name: string
  age: number
}

const arr = [10, 3, 5, 7, 2, 1, 8, 6, 9, 4]
const arrSorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const objArr: User[] = [
  {
    name: 'John',
    age: 40,
  },
  {
    name: 'Jane',
    age: 20,
  },
  {
    name: 'Joe',
    age: 30,
  },
  {
    name: 'Jenny',
    age: 22,
  },
]
const objectSorted: User[] = [
  {
    name: 'Jane',
    age: 20,
  },
  {
    name: 'Jenny',
    age: 22,
  },
  {
    name: 'Joe',
    age: 30,
  },
  {
    name: 'John',
    age: 40,
  },
]

describe('useBubbleSort', () => {
  it('should be defined', () => {
    expect(useBubbleSort).toBeDefined()
  })

  it('should sort', () => {
    const sorted = useBubbleSort(arr)
    expect(unref(sorted)).toMatchObject(arrSorted)
  })

  it('should pure sort function', () => {
    const sorted = useBubbleSort(arr)
    expect(unref(sorted)).toMatchObject(arrSorted)
  })

  it('should dirty sort', () => {
    const dirtyArr = [...arr]
    const sorted = useBubbleSort(dirtyArr, { dirty: true })

    expect(unref(sorted)).toMatchObject(arrSorted)
    expect(unref(dirtyArr)).toMatchObject(arrSorted)
  })

  it('should sort object', () => {
    const sorted = useBubbleSort(objArr, {
      compareFn: (a, b) => a.age - b.age,
    })

    expect(unref(sorted)).toMatchObject(objectSorted)
  })
})
