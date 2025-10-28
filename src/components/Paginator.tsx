'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { PER_PAGE } from '@/data/pagination'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

type PaginatorProps = {
  totalCount: number
  perPage?: number
  skip: number
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 3,
) {
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(currentPage - half, 1)
  const end = Math.min(start + maxVisible - 1, totalPages)

  // Adjust start again if we’re at the end
  start = Math.max(end - maxVisible + 1, 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Paginator({
  totalCount,
  perPage = PER_PAGE,
  skip,
}: PaginatorProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Math.floor(skip / perPage) + 1
  const totalPages = Math.ceil(totalCount / perPage)

  console.log('currentPage', currentPage)

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('start', ((page - 1) * perPage).toString())
    return `${pathname}?${params.toString()}`
  }

  // Simple range — e.g. 1 2 3 4 5 … n
  const visiblePages = getVisiblePages(currentPage, totalPages, 3)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? getPageHref(currentPage - 1) : '#'}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={getPageHref(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? getPageHref(currentPage + 1) : '#'}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
