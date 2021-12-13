import type { ColorInput } from 'tinycolor2'

import { clamp, MaybeRef } from '@vueuse/shared'
import { computed, ref, unref, watch } from 'vue-demi'
import tinycolor from 'tinycolor2'

export function useTinyColor2(input: MaybeRef<ColorInput>) {
  const instance = ref(tinycolor(unref(input)))

  const rgb = computed(() => instance.value.toRgbString())
  const hsl = computed(() => instance.value.toHslString())
  const hsv = computed(() => instance.value.toHsvString())
  const hex = computed(() => instance.value.toHexString())

  const isLight = computed(() => instance.value.isLight())
  const isDark = computed(() => instance.value.isDark())

  const greyscale = computed(() => instance.value.clone().greyscale().toString())
  const complement = computed(() => instance.value.clone().complement().toString())

  const darken = computed(() => (darken: number) => instance.value.clone().darken(clamp(darken, 0, 100)).toString())
  const lighten = computed(() => (lighten: number) => instance.value.clone().lighten(clamp(lighten, 0, 100)).toString())

  const desaturate = computed(() => (desaturate: number) => instance.value.clone().desaturate(clamp(desaturate, 0, 100)))
  const saturate = computed(() => (saturate: number) => instance.value.clone().saturate(clamp(saturate, 0, 100)))

  watch(() => unref(input), (newInput) => {
    instance.value = tinycolor(newInput)
  })

  return {
    instance,
    rgb,
    hsl,
    hsv,
    hex,

    isLight,
    isDark,

    greyscale,
    complement,

    darken,
    lighten,

    desaturate,
    saturate,
  }
}
