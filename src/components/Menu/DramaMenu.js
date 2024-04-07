import React from 'react';
import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const DramaMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4}>
            <Tooltip label="Wrap selected text with 'div' tags for acts, using type='act'" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("div", {type: "act"})}>Act</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'div' tags for scenes, using type='scene'" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("div", {type: "scene"})}>Scene</Button>
            </Tooltip>
            <Tooltip label="Wrap selected text with 'sp' tags for speeches" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("sp")}>Speech</Button>
            </Tooltip>
            <Tooltip label="Insert 'speaker' tags for speaker names" placement="auto">
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("speaker")}>Speaker</Button>
            </Tooltip>
            {/* Additional drama-specific tags and functionalities can be added here */}
        </HStack>
        </VStack>
    );
};

export default DramaMenu;
