import React from 'react';
import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const CorrespondenceMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4}>
            <Tooltip label="Wrap the opening of the letter, including salutation" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("opener")}>Opener</Button>
            </Tooltip>
            <Tooltip label="Wrap the closing of the letter, including signature" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("closer")}>Closer</Button>
            </Tooltip>
            <Tooltip label="Mark the address or location from where the letter is sent" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("address")}>Address</Button>
            </Tooltip>
            <Tooltip label="Indicate the date and/or place at the beginning of the letter" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("dateline")}>Dateline</Button>
            </Tooltip>
            <Tooltip label="Wrap postscript sections of the letter" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("postscript")}>Postscript</Button>
            </Tooltip>
            {/* Additional buttons for any other correspondence-specific tags */}
        </HStack>
        </VStack>
    );
};

export default CorrespondenceMenu;
