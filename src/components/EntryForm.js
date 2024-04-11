import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const EntryForm = ({ isOpen, onClose, handleFormSubmit, newEntryType, setNewEntryType, newEntryId, setNewEntryId, newEntryText, setNewEntryText }) => {
  const toast = useToast();

  const handleSubmit = (e) => {
    handleFormSubmit(e);
    toast({
      title: "Entry added.",
      description: "The new entry has been successfully added to the list.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose(); // Assuming onClose will handle resetting state as well
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Entry</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Select placeholder="Select type" value={newEntryType} onChange={e => setNewEntryType(e.target.value)}>
                <option value="PersonName">Person Name</option>
                <option value="PlaceName">Place Name</option>
                <option value="Bibl">Bibl</option>
              </Select>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Entry ID</FormLabel>
              <Input
                placeholder="Entry ID"
                value={newEntryId}
                onChange={e => setNewEntryId(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Entry Text</FormLabel>
              <Input
                placeholder="Entry Text"
                value={newEntryText}
                onChange={e => setNewEntryText(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              Add Entry
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EntryForm;
