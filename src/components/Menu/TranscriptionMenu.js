import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const TranscriptionMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4} wrap="wrap">
            <Tooltip label='Insert a line break' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("lb/")}>Line Break</Button>
            </Tooltip>
            <Tooltip label='Insert a page break' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("pb/")}>Page Break</Button>
            </Tooltip>
            <Tooltip label='Indicate added text' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("add")}>Addition</Button>
            </Tooltip>
            <Tooltip label='Mark text for deletion' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("del")}>Deletion</Button>
            </Tooltip>
            <Tooltip label='Mark an error in the text' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("sic")}>Sic</Button>
            </Tooltip>
            <Tooltip label='Provide a correction' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("corr")}>Correction</Button>
            </Tooltip>
            <Tooltip label='Encode a gap in the text' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("gap")}>Gap</Button>
            </Tooltip>
            <Tooltip label='Insert significant space' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("space")}>Space</Button>
            </Tooltip>
            {/* Add buttons for other transcription tags as needed */}
        </HStack>
        </VStack>
    );
};

TranscriptionMenu.displayName = "Transcription";

export default TranscriptionMenu;
