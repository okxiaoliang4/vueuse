<script setup lang="ts">
import { useTinyColor2 } from '.'

const { rgb, rgba, hsl, hsla, hsv, hex, hex8, isLight } = useTinyColor2('#fff00055')

</script>

<template>
  <div>rgb: {{ rgb }}</div>
  <div>rgba: {{ rgba }}</div>
  <div>hsl: {{ hsl }}</div>
  <div>hsla: {{ hsla }}</div>
  <div>hsv: {{ hsv }}</div>
  <div>hex: {{ hex }}</div>
  <div>hex8: {{ hex8 }}</div>
  <div>isLight: {{ isLight }}</div>
</template>
