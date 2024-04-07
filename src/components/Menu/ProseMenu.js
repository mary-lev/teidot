import React from 'react';
import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const ProseMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4}>
            <Tooltip label="Wrap selected text with 'div' tags for chapters or sections" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("div")}>Chapter/Section</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'p' tags for paragraphs" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("p")}>Paragraph</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'q' tags for inline quotes" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("q")}>Quote</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'said' tags for direct speech" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("said")}>Said/Direct Speech</Button>
            </Tooltip>
            {/* Additional buttons for semantic markup or other prose-specific tags */}
        </HStack>
        </VStack>
    );
};

export default ProseMenu;
