import { Button, Flex, IconButton } from '@chakra-ui/react'
import usePagination from '../hooks/usePagination'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    totalPageCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    totalPageCount,
    siblingCount,
    pageSize,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
    window.scrollTo(0, 0)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
    window.scrollTo(0, 0)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <Flex mt={5}>
      <IconButton
        size={'sm'}
        icon={<AiOutlineArrowLeft />}
        mr={2}
        disabled={currentPage === 1}
        onClick={onPrevious}
        colorScheme={'gray'}
        variant="ghost"
        aria-label="Previous page"
      />

      {paginationRange.map((pageNumber, index) => (
        // Render our Page Pills
        <Button
          size={'sm'}
          mr={2}
          key={parseInt(pageNumber.toString()) + index}
          colorScheme={pageNumber === currentPage ? 'twitter' : 'gray'}
          onClick={() => {
            onPageChange(pageNumber)
            window.scrollTo(0, 0)
          }}
          variant={pageNumber === '...' ? 'ghost' : 'solid'}
          disabled={pageNumber === '...' ? true : false}
          pointerEvents={pageNumber === '...' ? 'none' : 'auto'}
        >
          {pageNumber}
        </Button>
      ))}
      <IconButton
        size={'sm'}
        icon={<AiOutlineArrowRight />}
        disabled={currentPage === lastPage}
        onClick={onNext}
        colorScheme={'gray'}
        variant="ghost"
        aria-label="Next page"
      />
    </Flex>
  )
}

export default Pagination
