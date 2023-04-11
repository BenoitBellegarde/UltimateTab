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
    onPageChange((prevPage: number) => prevPage + 1)
  }

  const onPrevious = () => {
    onPageChange((prevPage: number) => prevPage - 1)
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
          key={pageNumber + index}
          colorScheme={pageNumber === currentPage ? 'twitter' : 'gray'}
          onClick={() => onPageChange(pageNumber)}
          variant={pageNumber === '...' ? 'ghost' : 'solid'}
          disabled={pageNumber === '...' ? true : false}
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
