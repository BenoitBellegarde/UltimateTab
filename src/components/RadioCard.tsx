import { Box, useCheckbox, useRadio } from '@chakra-ui/react'
export default function RadioCard(props): JSX.Element {
  const { getInputProps } = useRadio(props)
  const { getCheckboxProps } = useCheckbox(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        fontSize={'sm'}
        boxShadow="md"
        transition="background-color 0.2s ease 0s"
        _hover={{
          bg: 'twitter.400',
          color: 'white',
          opacity: props.isChecked ? 0.8 : 1,
        }}
        _checked={{
          bg: 'fadebp',
          color: 'white',
        }}
        p="2"
      >
        {props.children}
      </Box>
    </Box>
  )
}
