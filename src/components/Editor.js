import React, { useState, useRef } from 'react';

import {
    Flex,
    Box,
    Text,
    VStack,
    Select,
    Checkbox,
    CheckboxGroup

} from '@chakra-ui/react';

import { genreMenus, structureMenus, menuDisplayNames } from './menuConfig';
import SaveButton from './SaveButton';
import TagTypes from './testTagTypes';
import { useEditor } from '../hooks/useEditor';
import { handleTagWrapButtonClick, handleSingleTagInsertButtonClick } from '../utils/editorActions';
import { readFileContent } from '../utils/fileUtils'; // Adjust the import path according to your file structure


const Editor = () => {
    const editorContainerRef = useRef(null);
    const { setEditorContent, editorInstance } = useEditor(editorContainerRef);
    
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [selectedGenre, setSelectedGenre] = useState('');
    const [enabledStructureMenus, setEnabledStructureMenus] = useState(["editorMenu"]);

    const handleGenreChange = (e) => setSelectedGenre(e.target.value);
    const handleStructureMenuChange = (value) => setEnabledStructureMenus(value);

    const GenreMenuComponent = selectedGenre ? genreMenus[selectedGenre] : null;

    const [proposeAttributes, setProposeAttributes] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const content = await readFileContent(file);
                setEditorContent(content); // Update the editor's content
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    };  

    const handleProposeAttributesChange = () => {
        setProposeAttributes(!proposeAttributes);
    };

    const getEditorContent = () => editorInstance.state.doc.toString();

    const handleTagAction = (tagName, attributes = {}) => {
        // Retrieve the tag info object, which now may include 'type', 'description', and potentially 'variants'
        const tagInfo = TagTypes[tagName];

        if (!editorInstance || !tagInfo) {
            console.error("Tag not handled or editor view not available");
            return;
        }

        // Determine action based on tag type ('wrap' or 'insert')
        // For tags with variants, attributes are passed directly from the button click event
        switch (tagInfo.type) {
            case "wrap":
                handleTagWrapButtonClick(editorInstance, tagName, attributes);
                break;
            case "insert":
                handleSingleTagInsertButtonClick(editorInstance, tagName, attributes);
                break;
            default:
                console.error("Unhandled tag type or missing type info");
        }
    };

    return (
        <Box>
            <Flex direction={{ base: "column", md: "row" }} spacing={4} p={6}>
                <Box p={4} mr={10} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                    <VStack align="start">
                        <Text mb={2} fontWeight="bold">Markup Types:</Text>
                        <CheckboxGroup colorScheme="green" value={enabledStructureMenus} onChange={handleStructureMenuChange}>
                            <VStack align="start">
                                {Object.keys(structureMenus).map((key) => (
                                    <Checkbox key={key} value={key}>{menuDisplayNames[key]}</Checkbox>
                                ))}
                            </VStack>
                        </CheckboxGroup>
                    </VStack>
                    <Flex mt={6} align="center" justify="center"> {/* Adjusts layout to horizontal and centers items */}
                        {/* <Text mb={0} mr={3}>Select Text Genre: </Text> */}
                        <Select placeholder="Select Text Genre" onChange={handleGenreChange}>
                            {Object.entries(genreMenus).map(([key, value]) => (
                                <option key={key} value={key}>{menuDisplayNames[key]}</option>
                            ))}
                        </Select>
                    </Flex>
                    <Checkbox mt={6}
                        isChecked={proposeAttributes}
                        onChange={handleProposeAttributesChange}
                    >
                        Propose to fill attributes
                    </Checkbox>
                    <Flex mb={4} justify="center" mt={4}>
                        <input type="file" onChange={handleFileUpload} accept=".xml" />
                    </Flex>
                </Box>
                <Box width="60%">
                    {GenreMenuComponent && <GenreMenuComponent onTagButtonClick={handleTagAction} />}

                    {enabledStructureMenus.map((menuKey) => {
                        const StructureMenuComponent = structureMenus[menuKey];
                        return <StructureMenuComponent key={menuKey} onTagButtonClick={handleTagAction} />;
                    })}

                    {showWarning && (
                        <Box color="red.500" paddingTop="2">{warningMessage}</Box>
                    )}

                    <Box
                        ref={editorContainerRef}
                        className="editor-container"
                        width="full"
                        overflow="auto"
                        minH={500}
                        // borderColor="gray.200"
                        // borderWidth="1px"
                        p={3}
                    />
                    <SaveButton getEditorContent={getEditorContent} />
                </Box>
            </Flex>
        </Box>
    );
};

export default Editor;