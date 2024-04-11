import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

const AttributeInputModal = ({ isOpen, onClose, tagName, onSubmit, additionalData }) => {
  const [attributeValue, setAttributeValue] = useState('');

  const handleSubmit = () => {
    // Assuming the structure of onSubmit allows for flexible data
    onSubmit({ attribute: attributeValue, additionalData });
    onClose(); // Close the modal after submission
  };

  // Example of conditional content based on tagName
  const renderContentForTag = () => {
    switch (tagName) {
      case 'bibl':
        return (
          <FormControl>
            <FormLabel htmlFor="attributeValue">Corresp ID for {tagName}</FormLabel>
            <Select id="attributeValue" value={attributeValue} onChange={(e) => setAttributeValue(e.target.value)}>
              {additionalData && additionalData.map((data) => (
                <option key={data.id} value={data.id}>{data.description}</option>
              ))}
            </Select>
          </FormControl>
        );
      case 'personName':
        return (
          <FormControl>
            <FormLabel htmlFor="attributeValue">Role for {tagName}</FormLabel>
            <Input id="attributeValue" value={attributeValue} onChange={(e) => setAttributeValue(e.target.value)} />
          </FormControl>
        );
      default:
        return (
          <FormControl>
            <FormLabel htmlFor="attributeValue">Value for {tagName}</FormLabel>
            <Input id="attributeValue" value={attributeValue} onChange={(e) => setAttributeValue(e.target.value)} />
          </FormControl>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Attribute Value</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderContentForTag()}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttributeInputModal;
