import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const CriticalApparatusMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4} wrap="wrap">
            <Tooltip label='Wrap selected text to indicate an intentional preservation of an error or unusual form' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("sic")}>Sic</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "corr" tags for corrections' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("corr")}>Correction</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "add" tags for additions' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("add")}>Addition</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "del" tags for deletions' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("del")}>Deletion</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "note" tags for annotations or scholarly notes' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("note")}>Note</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "supplied" tags for editorially supplied text' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("supplied")}>Supplied Text</Button>
            </Tooltip>
            {/* Additional buttons for other critical apparatus tags as needed */}
        </HStack>
        </VStack>
    );
};

CriticalApparatusMenu.displayName = "Critical Apparatus";

export default CriticalApparatusMenu;
