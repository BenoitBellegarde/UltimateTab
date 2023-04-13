import { Box, useRadio } from '@chakra-ui/react'
export default function RadioCard(props): JSX.Element {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        mb={2}
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        fontSize={'sm'}
        boxShadow="md"
        transition="background-color 0.2s ease 0s"
        _hover={{
          bg: 'twitter.300',
          color: 'white',
        }}
        _checked={{
          bg: 'twitter.600',
          color: 'white',
          borderColor: 'twitter.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        p="2"
      >
        {props.children}
      </Box>
    </Box>
  )
}
