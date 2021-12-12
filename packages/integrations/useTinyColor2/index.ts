import type { ColorInput } from 'tinycolor2'

import { MaybeRef } from '@vueuse/shared'
import { computed, ref, unref, watch } from 'vue-demi'
import tinycolor from 'tinycolor2'

export function useTinyColor2(input: MaybeRef<ColorInput>) {
  const tinycolorRef = ref(tinycolor(unref(input)))

  const rgb = computed(() => tinycolorRef.value.toRgbString())
  const rgba = computed(() => tinycolorRef.value.toRgbString())
  const hsl = computed(() => tinycolorRef.value.toHslString())
  const hsla = computed(() => tinycolorRef.value.toHslString())
  const hsv = computed(() => tinycolorRef.value.toHsvString())
  const hex = computed(() => `#${tinycolorRef.value.toHex()}`)
  const hex8 = computed(() => `#${tinycolorRef.value.toHex8()}`)

  const isLight = computed(() => tinycolorRef.value.isLight())
  const isDark = computed(() => tinycolorRef.value.isDark())

  watch(() => unref(input), (newInput) => {
    tinycolorRef.value = tinycolor(newInput)
  })

  return {
    rgb,
    rgba,
    hsl,
    hsla,
    hsv,
    hex,
    hex8,
    isLight,
    isDark,
  }
}
