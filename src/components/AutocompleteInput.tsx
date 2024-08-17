import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import useAppStateContext from '../hooks/useAppStateContext'
import useAutocomplete from '../hooks/useAutocomplete'
import { getSearchObjectParameters } from '../lib/utils/params'

export default function AutocompleteInput({
  refBackdrop,
}: {
  refBackdrop: MutableRefObject<HTMLDivElement>
}): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refInput = useRef<HTMLInputElement>(null)
  const [valueAC, setValueAC] = useState<string>('')
  const [inputFocus, setInputFocus] = useState<boolean>(false)
  const [idSuggestionHighlighted, setIdSuggestionHighlighted] =
    useState<number>(-1)

  const { data: dataAC } = useAutocomplete(valueAC)
  const suggestions =
    (!dataAC || dataAC.length === 0) && valueAC ? [valueAC] : dataAC

  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const fontSizeSuggestions = useBreakpointValue({ base: 'sm', md: 'md' })
  const marginIconSearch = useBreakpointValue({ base: 2, md: 4 })

  const showBackdrop = (show: boolean = true) =>
    show
      ? (refBackdrop.current.style.display = 'block')
      : (refBackdrop.current.style.display = 'none')

  const formatSuggestion = (suggestion: string) =>
    suggestion.charAt(0).toUpperCase() + suggestion.slice(1)

  useEffect(() => {
    if (searchParams.get('q')) {
      setValueAC(searchParams.get('q'))
    }
  }, [searchParams])
  return (
    <InputGroup
      size={useBreakpointValue({ base: 'sm', md: 'md' })}
      mr={5}
      zIndex={1}
    >
      <InputLeftElement
        h={'100%'}
        cursor={'pointer'}
        onClick={() => router.pathname !== '/search' && router.push('/search')}
      >
        <SearchIcon color="gray.300" />
      </InputLeftElement>

      <Input
        ref={refInput}
        onChange={(e) => {
          setValueAC(e.target.value)
          setIdSuggestionHighlighted(-1)
        }}
        onFocus={() => {
          setInputFocus(true)
          showBackdrop(true)
        }}
        onBlur={() => {
          setInputFocus(false)
          showBackdrop(false)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            let valueToSearch = formatSuggestion(valueAC)
            if (
              idSuggestionHighlighted !== -1 &&
              suggestions[idSuggestionHighlighted]
            ) {
              valueToSearch = formatSuggestion(
                suggestions[idSuggestionHighlighted],
              )
              setValueAC(valueToSearch)
            }
            router.push({
              pathname: `/search`,
              query: getSearchObjectParameters(searchParams, {
                q: valueToSearch,
                page: 1,
              }),
            })
            refInput.current.blur()
            setInputFocus(false)
            showBackdrop(false)
          } else if (e.key === 'ArrowDown') {
            setIdSuggestionHighlighted((prevVal) =>
              prevVal === suggestions.length - 1 ? prevVal : prevVal + 1,
            )
          } else if (e.key === 'ArrowUp') {
            setIdSuggestionHighlighted((prevVal) =>
              prevVal === -1 ? prevVal : prevVal - 1,
            )
          } else if (e.key === 'Escape') {
            refInput.current.blur()
            setInputFocus(false)
            showBackdrop(false)
          }
        }}
        placeholder="Search a song or an artist..."
        borderRadius={!inputFocus && 'full'}
        bg={'var(--chakra-colors-chakra-body-bg)'}
        value={valueAC}
        type={'search'}
      />
      <Box
        position={'absolute'}
        top="100%"
        left={0}
        right={0}
        borderWidth={suggestions ? 2 : 0}
        borderColor={borderColor}
        shadow={'md'}
        display={inputFocus ? 'block' : 'none'}
        bg={'var(--chakra-colors-chakra-body-bg)'}
      >
        {suggestions?.map((result, index) => (
          <LinkBox
            className="tab-result"
            key={index}
            onClick={(e) => {
              const suggestion = formatSuggestion(result)
              setValueAC(suggestion)
              router.push({
                pathname: `/search`,
                query: getSearchObjectParameters(searchParams, {
                  q: suggestion,
                  page: 1,
                }),
              })
              setIdSuggestionHighlighted(-1)
              refInput.current.blur()
            }}
            // Disable blur when clicking on suggestion, manually blur the input onClick event to setSearchValue before dismissing suggestions box
            // https://stackoverflow.com/a/57630197
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            _hover={{
              bg: 'twitter.400',
              color: 'white',
              opacity: 1,
            }}
            as="div"
            p="2"
            m="0"
            cursor={'pointer'}
            width={'100%'}
            rounded={0}
            display={'flex'}
            flexGrow={'1'}
            justifyContent={'start'}
            alignItems="center"
            boxShadow="xs"
            bg={index === idSuggestionHighlighted && 'twitter.400'}
            color={index === idSuggestionHighlighted && 'white'}
            fontSize={fontSizeSuggestions}
            transition="background-color 0.2s ease 0s"
          >
            <SearchIcon mr={marginIconSearch} />
            {result.charAt(0).toUpperCase() + result.slice(1)}
          </LinkBox>
        ))}
      </Box>
    </InputGroup>
  )
}
