import { nextTick, ref } from 'vue-demi'
import { useOffsetPagination } from '.'

describe('useOffsetPagination', () => {
  it('should be defined', () => {
    expect(useOffsetPagination).toBeDefined()
  })

  it('reactivity', () => {
    const page = ref(1)
    const pageSize = ref(10)

    const {
      currentPage,
      currentPageSize,
      pageCount,
      isFirstPage,
      isLastPage,
      prev,
      next,
    } = useOffsetPagination({
      total: 100,
      page,
      pageSize,
    })

    expect(currentPage.value).toBe(1)
    expect(currentPageSize.value).toBe(10)
    expect(pageCount.value).toBe(10)
    expect(isFirstPage.value).toBe(true)
    expect(isLastPage.value).toBe(false)

    next()
    expect(currentPage.value).toBe(2)
    expect(isFirstPage.value).toBe(false)

    prev()
    expect(currentPage.value).toBe(1)
    expect(isFirstPage.value).toBe(true)

    page.value = 10
    expect(currentPage.value).toBe(10)
    expect(isFirstPage.value).toBe(false)
    expect(isLastPage.value).toBe(true)
  })

  it('should run callback', async() => {
    const page = ref(1)
    const pageSize = ref(10)
    const total = ref(100)

    const pageChangeTime = ref(0)
    const pageSizeChangeTime = ref(0)
    const pageCountChangeTime = ref(0)

    const {
      prev,
      next,
    } = useOffsetPagination({
      total,
      page,
      pageSize,
      onPageChange: () => pageChangeTime.value++,
      onPageSizeChange: () => pageSizeChangeTime.value++,
      onPageCountChange: () => pageCountChangeTime.value++,
    })

    expect(pageChangeTime.value).toBe(0)
    expect(pageSizeChangeTime.value).toBe(0)
    expect(pageCountChangeTime.value).toBe(0)

    next()
    await nextTick()
    expect(pageChangeTime.value).toBe(1)

    pageSize.value = 20
    await nextTick()
    expect(pageSizeChangeTime.value).toBe(1)
    expect(pageCountChangeTime.value).toBe(1)

    total.value = 200
    await nextTick()
    expect(pageCountChangeTime.value).toBe(2)

    prev()
    await nextTick()
    expect(pageChangeTime.value).toBe(2)
  })
})
