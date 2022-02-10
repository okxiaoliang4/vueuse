import { computed, unref } from 'vue-demi'
import type { MaybeRef } from '@vueuse/shared'
import type { MaybeElementRef } from '@vueuse/core'
import { useEventListener } from '@vueuse/core'
import { unrefElement } from '../unrefElement'

export interface UseWheelScrollDirectionOptions {
  direction?: MaybeRef<'horizontal' | 'vertical' | 'auto' | undefined>
  scrollDeltaRatio?: MaybeRef<number>
}

/**
 * Restrict wheel scroll direction.
 *
 * @param target
 * @param options - UseWheelScrollDirectionOptions
 * @see https://vueuse.org/useWheelScrollDirection
 */
export function useWheelScrollDirection(target: MaybeElementRef, options: UseWheelScrollDirectionOptions = {}) {
  const elementRef = computed(() => unrefElement(target))

  useEventListener(elementRef, 'wheel', (e: WheelEvent & {
    wheelDelta: number
    wheelDeltaX: number
    wheelDeltaY: number
  }) => {
    const { direction: directionOption = 'auto', scrollDeltaRatio = 1 } = options

    const direction = unref(directionOption) ?? 'auto'

    if (direction === 'auto')
    // default wheel event
      return

    // Take over wheel events
    e.preventDefault()

    const ele = unref(elementRef) as HTMLElement

    const processWheelDelta = (delta: number) => -delta * unref(scrollDeltaRatio)

    if (direction === 'horizontal') {
      let wheelDelta: number = Math.abs(e.wheelDeltaX) >= Math.abs(e.wheelDeltaY) ? e.wheelDeltaX : e.wheelDeltaY
      wheelDelta = processWheelDelta(wheelDelta)

      ele.scrollTo({
        left: ele.scrollLeft + wheelDelta,
      })
    }
    else if (direction === 'vertical') {
      let wheelDelta: number = Math.abs(e.wheelDeltaY) >= Math.abs(e.wheelDeltaX) ? e.wheelDeltaY : e.wheelDeltaX
      wheelDelta = processWheelDelta(wheelDelta)

      ele.scrollTo({
        top: ele.scrollTop + wheelDelta,
      })
    }
  })
}
