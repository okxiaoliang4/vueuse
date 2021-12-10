import { ref } from 'vue-demi'

export function useTinyColor2() {
  const rgb = ref('')
  const rgba = ref('')
  const hsl = ref('')
  const hsla = ref('')
  const hsv = ref('')

  return {
    rgb,
    rgba,
    hsl,
    hsla,
    hsv,
  }
}
