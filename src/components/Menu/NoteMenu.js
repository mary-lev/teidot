import React from 'react';
import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const NoteMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
            <HStack spacing={4}>
                <Tooltip label="Wrap selected text with 'div' tags" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("div")}>Div</Button>
                </Tooltip>
                <Tooltip label="Make text bold using 'ref' with rend attribute" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("ref", { rend: "bold" })}>Citate</Button>
                </Tooltip>
                <Tooltip label="Insert a 'note' tag" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("note", {type: "comm"})}>Single comment</Button>
                </Tooltip>
                <Tooltip label="Reference a title using 'bibl' with corresp attribute" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("bibl", { corresp: "" })}>Bibl</Button>
                </Tooltip>
                <Tooltip label="Make text bold using 'hi' with rend attribute" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("hi", { rend: "bold" })}>Bold (Hi)</Button>
                </Tooltip>
                <Tooltip label="Make text italic using 'hi' with rend attribute" placement="auto">
                    <Button colorScheme="purple" variant="outline" size="sm" onClick={() => onTagButtonClick("hi", { rend: "italic" })}>Italic (Hi)</Button>
                </Tooltip>
            </HStack>
        </VStack>
    );
};

export default NoteMenu;
