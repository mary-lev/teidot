import React from 'react';
import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const PoetryMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4}>
            <Tooltip label="Wrap selected text with 'lg' tags for stanzas" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("lg")}>Stanza (lg)</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'l' tags for lines" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("l")}>Line (l)</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'head' tags for headings" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("head")}>Heading (head)</Button>
            </Tooltip>
            {/* Add more poetry-specific tags as needed */}
        </HStack>
        </VStack>
    );
};

export default PoetryMenu;
