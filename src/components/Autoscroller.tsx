import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Icon,
  Button,
  IconButton,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'

interface AutoscrollerProps {
  showAutoscroll: boolean
  bottomCSS: string
  isLoading: boolean
}
export default function Autoscroller({
  showAutoscroll,
  bottomCSS,
  isLoading,
}: AutoscrollerProps): JSX.Element {
  const widthToolsBar = useBreakpointValue({
    base: '100%',
    sm: '50%',
  })
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const [isScrolling, setIsScrolling] = useState<boolean>(
    showAutoscroll ? true : false,
  )
  const [isEnabled, setIsEnabled] = useState<boolean>(
    showAutoscroll ? true : false,
  )
  const [scrollSpeed, setScrollSpeed] = useState<number>(200000)
  const requestAnimationFrameRef = useRef<number>(0)
  const manualScrollintervalRef = useRef<NodeJS.Timeout>(null)

  if (typeof document !== 'undefined') {
    var isTouch = 'ontouchstart' in document.documentElement
  }

  const formatSpeed = (scrollSpeed: number) => {
    const base100 = 200000
    const percent = base100 / scrollSpeed
    return Math.round(percent * 100)
  }

  const handlePlayButton = () => {
    setIsScrolling((isScrolling) => !isScrolling)
    setIsEnabled((isEnabled) => !isEnabled)
  }

  const resetRequestAnimationFrame = () => {
    cancelAnimationFrame(requestAnimationFrameRef.current)
    requestAnimationFrameRef.current = null
  }

  useEffect(() => {
    setIsScrolling(showAutoscroll)
    setIsEnabled(showAutoscroll)
  }, [showAutoscroll])

  useEffect(() => {
    if (!isScrolling && requestAnimationFrameRef.current !== 0) {
      resetRequestAnimationFrame()
      return
    }
    const currentPos = window.pageYOffset
    let start = null
    const pos = document.querySelector('body').offsetHeight

    requestAnimationFrameRef.current = window.requestAnimationFrame(
      function step(currentTime) {
        if (!isScrolling) {
          resetRequestAnimationFrame()
          return
        }
        start = !start ? currentTime : start
        var progress = currentTime - start
        if (currentPos < pos) {
          window.scrollTo(
            0,
            ((pos - currentPos) * progress) / scrollSpeed + currentPos,
          )
        } else {
          window.scrollTo(
            0,
            currentPos - ((currentPos - pos) * progress) / scrollSpeed,
          )
        }
        if (progress < scrollSpeed) {
          requestAnimationFrameRef.current = window.requestAnimationFrame(step)
        } else {
          window.scrollTo(0, pos)
        }
      },
    )
  }, [isScrolling, scrollSpeed])

  useEffect(() => {
    return () => {
      if (requestAnimationFrameRef.current !== 0) {
        resetRequestAnimationFrame()
        return
      }
    }
  }, [])

  useEffect(() => {
    const handleManualScroll = () => {
      if (isEnabled) {
        setIsScrolling(false)
        resetRequestAnimationFrame()
        manualScrollintervalRef.current = setTimeout(() => {
          setIsScrolling(true)
        }, 400)
      } else {
        resetRequestAnimationFrame()
      }
    }
    ;['mousewheel', 'touchstart'].forEach((evt) =>
      window.addEventListener(evt, handleManualScroll),
    )
    return () => {
      ;['mousewheel', 'touchstart'].forEach((evt) =>
        window.removeEventListener(evt, handleManualScroll),
      )
    }
  }, [isEnabled, isScrolling, scrollSpeed])

  return (
    <>
      {showAutoscroll && (
        <Flex
          position={'fixed'}
          width={widthToolsBar}
          left={'50%'}
          transform={'translate(-50%, 0)'}
          height={'60px'}
          bg={'whiteAlpha.50'}
          border={'1px'}
          borderColor={borderColor}
          backdropFilter={'blur(6px)'}
          shadow={'lg'}
          rounded={'full'}
          bottom={bottomCSS}
          justifyContent={'space-between'}
          alignItems={'center'}
          px={3}
          display={isLoading ? 'none' : 'flex'}
        >
          <Text px={1} fontSize="xs">
            {' '}
            Autoscroll
          </Text>
          <Button
            variant="outline"
            _hover={{
              bg: 'twitter.400',
              color: 'white',
              opacity: isEnabled ? 0.8 : 1,
            }}
            _active={{
              bg: 'fadebp',
              color: 'white',
            }}
            isActive={isEnabled}
            onTouchStart={handlePlayButton}
            onMouseDown={!isTouch ? handlePlayButton : undefined}
            size={'sm'}
            boxShadow="md"
            fontWeight={'normal'}
            px="3"
            py="4"
            leftIcon={<Icon as={FaPlayCircle} />}
          >
            {isEnabled ? 'Stop' : 'Start'}
          </Button>
          <Text px={1} fontSize="sm">
            {' '}
            Speed : {formatSpeed(scrollSpeed)}%
          </Text>
          <Flex>
            <IconButton
              variant="outline"
              _hover={{
                bg: 'twitter.400',
                color: 'white',
              }}
              size={'sm'}
              boxShadow="md"
              fontWeight={'normal'}
              px="3"
              py="4"
              mr={1}
              onClick={() => {
                const savedIsScrolling = isScrolling
                setIsScrolling(false)
                resetRequestAnimationFrame()
                setScrollSpeed((prevSpeed) => prevSpeed + 10000)
                setIsScrolling(savedIsScrolling)
              }}
              aria-label="Reduce speed"
              icon={<MinusIcon />}
            />
            <IconButton
              variant="outline"
              _hover={{
                bg: 'twitter.400',
                color: 'white',
              }}
              size={'sm'}
              boxShadow="md"
              fontWeight={'normal'}
              px="3"
              py="4"
              onClick={() => {
                const savedIsScrolling = isScrolling
                setIsScrolling(false)
                resetRequestAnimationFrame()
                setScrollSpeed((prevSpeed) =>
                  Math.max(prevSpeed - 10000, 50000),
                )
                setIsScrolling(savedIsScrolling)
              }}
              aria-label="Increase speed"
              icon={<AddIcon />}
            />
          </Flex>
        </Flex>
      )}
    </>
  )
}
