import { unref } from 'vue-demi'
import { usePropValueByPath } from '.'

describe('usePropValueByPath', () => {
  it('should be defined', () => {
    expect(usePropValueByPath).toBeDefined()
  })

  it('should return a object with value', () => {
    const obj = {
      a: {
        b: {
          c: 'c',
        },
      },
    }

    const { value } = usePropValueByPath(obj, 'a.b.c')

    expect(unref(value)).toBe('c')
  })

  it('should reactive', () => {
    const obj = {
      a: {
        b: {
          c: 'c',
        },
      },
    }

    const { value } = usePropValueByPath(obj, 'a.b.c')

    expect(unref(value)).toBe('c')
  })
})
