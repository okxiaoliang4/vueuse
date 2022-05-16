import type { MaybeRef } from '@vueuse/shared'
import { ref, unref, watchEffect } from 'vue-demi'

export function usePropValueByPath(obj: MaybeRef<Record<string | number | symbol, any>>, path: string): MaybeRef<any> {
  const value = ref()

  watchEffect(() => {
    let tempObj = unref(obj)
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    const keyArr = path.split('.')
    let i = 0
    const len = keyArr.length
    for (; i < len - 1; ++i) {
      const key = keyArr[i]
      if (key in tempObj)
        tempObj = tempObj[key]

      else
        throw new Error('[iView warn]: please transfer a valid prop path to form item!')
    }
    value.value = tempObj[keyArr[i]]
  })

  return {
    value,
  }
}
