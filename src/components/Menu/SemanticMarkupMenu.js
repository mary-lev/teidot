import { Button, HStack, VStack, Tooltip } from '@chakra-ui/react';

const SemanticMarkupMenu = ({ onTagButtonClick }) => {
    return (
        <VStack p={1} spacing={4}>
        <HStack spacing={4} wrap="wrap">
            <Tooltip label='Wrap selected text with "persName" tags for personal names' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("persName", { ref: "" })}>Person Name</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "placeName" tags for place names' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("placeName", { ref: "" })}>Place Name</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "date" tags for dates' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("date")}>Date</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "orgName" tags for organizational names' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("orgName")}>Organization Name</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "roleName" tags for roles or titles' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("roleName")}>Role/Title</Button>
            </Tooltip>
            <Tooltip label='Wrap selected text with "title" tags for titles of works' placement='auto'>
                <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick("title")}>Work Title</Button>
            </Tooltip>
            {/* Add more buttons for other semantic tags as needed */}
        </HStack>
        </VStack>
    );
};

SemanticMarkupMenu.displayName = "Semantic Markup";

export default SemanticMarkupMenu;
