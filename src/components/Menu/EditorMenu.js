import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const EditorMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
            <HStack spacing={4} wrap="wrap">
            <Tooltip label='Wrap selected text with "p" tags for a paragraph' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("p")}>Paragraph</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "div" tags for divisions' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("div")}>Division</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "head" tags for headings' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("head")}>Heading</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "lg" tags for line groups in poetry or verse' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("lg")}>Line Group</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "l" tags for individual lines in poetry or verse' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("l")}>Line</Button>
            </Tooltip>
            <Tooltip label='Insert "lb" tag for a line break' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("lb/")}>Line Break</Button>
            </Tooltip>
            <Tooltip label='Insert "pb" tag for a page break' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("pb/")}>Page Break</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "quote" tags for block quotations' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("quote")}>Quote</Button>
            </Tooltip>
            {/* Additional buttons for other tags as needed */}
            </HStack>
        </VStack>
    );
};

EditorMenu.displayName = "Text Structure";

export default EditorMenu;
