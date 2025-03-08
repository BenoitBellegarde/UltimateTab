import {
  Button,
  Icon,
  Input,
  InputGroup,
  MenuItem,
  useClipboard,
  useDisclosure,
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
import { BiExport } from 'react-icons/bi'
import useAppStateContext from '../hooks/useAppStateContext'
import LZString from 'lz-string'

export default function FavoritesExporter(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { favorites } = useAppStateContext()

  const favoritesStringified = JSON.stringify(favorites)
  const favoritesEncoded =
    LZString.compressToEncodedURIComponent(favoritesStringified)
  const { onCopy, value, setValue, hasCopied } = useClipboard(favoritesEncoded)
  return (
    <>
      <MenuItem onClick={onOpen} key="import">
        <Icon position="relative" top="-0.05rem" mr={'5px'} as={BiExport} />{' '}
        Export
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export your favorites</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Copy the token below and paste it into the <strong>Import</strong>{' '}
            tab on your other device to import your favorites .
            <InputGroup>
              <Input
                readOnly
                mt={4}
                placeholder="Export code to import"
                textOverflow={'ellipsis'}
                value={value}
              />
              <Button
                variant="solid"
                size="md"
                mt={4}
                ml={2}
                colorScheme="blue"
                onClick={onCopy}
              >
                {hasCopied ? 'Copied!' : 'Copy'}
              </Button>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
