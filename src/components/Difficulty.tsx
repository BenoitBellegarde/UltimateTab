import { Flex, Icon, Text, useBreakpointValue } from '@chakra-ui/react'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'

interface DifficultyProps {
  level: string
}
export default function Difficulty({
  level = 'unknown',
}: DifficultyProps): JSX.Element {
  const getDifficultyIcon = (level: string) => {
    let color = ''
    switch (level) {
      case 'novice':
      case 'beginner':
      case 'absolute beginner':
        color = 'green'
        break
      case 'intermediate':
        color = 'orange'
        break
      case 'advanced':
        color = 'red'
        break
      default:
        color = 'gray.400'
        break
    }
    return (
      <Icon
        pb={'0.1rem'}
        boxSize={5}
        color={color}
        as={MdOutlineSignalCellularAlt}
      />
    )
  }
  return (
    <Flex>
      {getDifficultyIcon(level)}
      <Text
        maxW={useBreakpointValue({
          base: '6rem',
          sm: '100%',
        })}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        whiteSpace={'pre'}
        ml={1}
      >
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Text>
    </Flex>
  )
}
