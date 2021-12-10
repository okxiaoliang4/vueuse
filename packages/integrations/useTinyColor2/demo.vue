<script setup lang="ts">
import { useTinyColor2 } from '.'

const { rgb } = useTinyColor2('#f00')

</script>

<template>
  <div>rgb:{{ rgb }}</div>
</template>
