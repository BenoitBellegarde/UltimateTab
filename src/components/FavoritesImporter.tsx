import {
  Button,
  Icon,
  Input,
  MenuItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BiImport } from 'react-icons/bi'
import useAppStateContext from '../hooks/useAppStateContext'
import LZString from 'lz-string'
import { useRef } from 'react'

export default function FavoritesImporter(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setFavorites } = useAppStateContext()
  const ref = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const importFavorites = (compressedData: string) => {
    try {
      const decompressed =
        LZString.decompressFromEncodedURIComponent(compressedData)
      setFavorites(JSON.parse(decompressed))
      toast({
        description: 'Favorites successfully imported',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        description:
          'An error occurred while importing your favorites. Please try again or check if the data is valid.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <MenuItem onClick={onOpen} key="import">
        <Icon position="relative" top="-0.05rem" mr={'5px'} as={BiImport} />{' '}
        Import
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import your favorites</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please enter the <strong>Export</strong> token of your favorites
            retrieved from another device in the input field below.
            <Input ref={ref} mt={4} placeholder="Export token" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (ref.current.value && ref.current.value != '') {
                  importFavorites(ref.current.value)
                }
                onClose()
              }}
            >
              Import
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
