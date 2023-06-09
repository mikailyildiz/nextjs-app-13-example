import Link from 'next/link'
import React from 'react'
import usePagination from '../../../hooks/usePagination'
import styles from './styles.module.css'
import { PaginationProps } from '../../types'

// export type PaginationProps = {
//   totalItems: number
//   currentPage: number
//   renderPageLink: (page: number) => string
//   itemsPerPage?: number
// }

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  return (
    <div className="">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className={styles.number}
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number)}
            className={`${styles.number} ${
              pageNumber === currentPage ? styles.active : ''
            }`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  )
}

export default Pagination