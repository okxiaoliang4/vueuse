<script setup lang="ts">
import { stringify } from '@vueuse/docs-utils'
import { reactive } from 'vue-demi'
import { useEyeDropper } from '../../core/useEyeDropper'
import { useClamp } from '../../core/useClamp'
import { useTinyColor2 } from '.'

const { sRGBHex, open } = useEyeDropper({ initialValue: '#42b983' })
const tinyColor = reactive(useTinyColor2(sRGBHex))

const darken = useClamp(10, 0, 100)
const str = stringify(tinyColor)
</script>

<template>
  <button @click="() => open()">
    pick color
  </button>
  <div>
    <input v-model="sRGBHex" placeholder="color" type="text" />
  </div>
  <div class="inline-grid grid-cols-2 gap-x-4 gap-y-2 items-center">
    <div>rgb:</div>
    <div>{{ tinyColor.rgb }}</div>

    <div>hex:</div>
    <div>{{ tinyColor.hex }}</div>

    <div>hsl:</div>
    <div>{{ tinyColor.hsl }}</div>

    <div>hsv:</div>
    <div>{{ tinyColor.hsv }}</div>

    <div>lighten(10):</div>
    <div
      :style="{ backgroundColor: tinyColor.lighten(10) }"
      class="text-gray-700"
    >
      {{ tinyColor.lighten(10) }}
    </div>

    <div>greyscale:</div>
    <div
      :style="{ backgroundColor: tinyColor.greyscale, color: tinyColor.rgb }"
    >
      {{ tinyColor.greyscale }}
    </div>

    <div>complement:</div>
    <div
      :style="{ backgroundColor: tinyColor.complement, color: tinyColor.rgb }"
    >
      {{ tinyColor.complement }}
    </div>

    <div>darken(10):</div>
    <div>{{ tinyColor.darken(darken) }}</div>
  </div>
</template>
