export type PaginationProps = {
    totalItems: number
    currentPage: number
    renderPageLink: (page: number) => string
    itemsPerPage?: number
  }

