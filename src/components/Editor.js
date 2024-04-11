import React, { useState, useRef, useEffect } from 'react';

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
import { handleTagWithUserAttributes, handleSingleTagInsertButtonClick, handleTagWithUserSelectAttributes } from '../utils/editorActions';
import { readFileContent } from '../utils/fileUtils'; // Adjust the import path according to your file structure
import AttributeInputModal from './AttributeInputModal';


const Editor = ({ defaultFileName, availableMenus = [] }) => {
    const editorContainerRef = useRef(null);
    const { setEditorContent, editorInstance } = useEditor(editorContainerRef, defaultFileName);

    const parseXml = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        return xmlDoc;
    };

    const extractBiblData = (xmlDoc) => {
        const biblElements = xmlDoc.querySelectorAll("listBibl > bibl");
        const biblData = Array.from(biblElements).map(bibl => ({
            id: bibl.getAttribute("xml:id"),
            description: bibl.textContent.trim()
        }));
        return biblData;
    };
    const [biblOptions, setBiblOptions] = useState([]);
    const [personNameOptions, setPersonNameOptions] = useState([]);
    const [placeNameOptions, setPlaceNameOptions] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTag, setCurrentTag] = useState('');
    const [currentAttributeKey, setCurrentAttributeKey] = useState('');
    const [currentAttributeValue, setCurrentAttributeValue] = useState('');

    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [selectedGenre, setSelectedGenre] = useState('');
    const [availableStructureMenus, setAvailableStructureMenus] = useState([]);
    const [enabledStructureMenus, setEnabledStructureMenus] = useState(["editorMenu"]);

    const handleGenreChange = (e) => setSelectedGenre(e.target.value);
    const handleStructureMenuChange = (value) => setEnabledStructureMenus(value);

    const GenreMenuComponent = selectedGenre ? genreMenus[selectedGenre] : null;

    const [proposeAttributes, setProposeAttributes] = useState(false);

    useEffect(() => {
        // Filter structureMenus based on availableMenus prop
        const filteredMenus = Object.keys(structureMenus).filter(key => availableMenus.includes(key));
        setAvailableStructureMenus(filteredMenus);
        // Reset enabledStructureMenus if it includes menus not available
        setEnabledStructureMenus(prev => prev.filter(menu => filteredMenus.includes(menu)));
    }, [availableMenus]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const content = await readFileContent(file);
                setEditorContent(content);

                const xmlDoc = parseXml(content);
                const extractedData = extractBiblData(xmlDoc);
                setBiblOptions(extractedData); // Set the extracted data for dropdown
                console.log("Extracted data:", extractedData);
            } catch (error) {
                console.error("Error processing file:", error);
            }
        }
    };

    const handleProposeAttributesChange = () => {
        setProposeAttributes(!proposeAttributes);
    };

    const getEditorContent = () => editorInstance.state.doc.toString();

    const requestTagAttributes = (tagName, attributeKey) => {
        setCurrentTag(tagName);
        setCurrentAttributeValue(attributeKey); // Assuming your modal uses this to show the right input field
        setModalOpen(true);
    };

    const handleAttributeSubmit = (currentAttributeKey) => {
        setCurrentAttributeValue(currentAttributeKey.attribute);
        handleTagWithUserSelectAttributes(editorInstance, currentTag, currentAttributeKey, currentAttributeValue);
        setModalOpen(false);
        setCurrentTag('');
        setCurrentAttributeKey("");
    };

    const handleTagAction = (tagName, attributes = {}) => {
        const tagInfo = TagTypes[tagName];

        if (!editorInstance || !tagInfo) {
            console.error("Tag not handled or editor view not available");
            return;
        }

        switch (tagInfo.type) {
            case "wrap":
                handleTagWithUserAttributes(editorInstance, tagName, attributes);
                break;
            case "insert":
                handleSingleTagInsertButtonClick(editorInstance, tagName, attributes);
                break;
            case "attributeInput":
                const attributeKey = Object.keys(attributes).find(key => attributes[key] === "");
                setCurrentAttributeKey(attributeKey);
                requestTagAttributes(tagName, attributeKey);
                break;
            case "attributeSelectInput":
                requestTagAttributes(tagName, attributes);
                setCurrentAttributeKey(attributeKey);
                requestTagAttributes(tagName, attributeKey);
            default:
                console.error("Unhandled tag type or missing type info");
        }
    };

    return (
        <>
            <Box>
                <Flex direction={{ base: "column", md: "row" }} spacing={4} p={6}>
                    <Box p={4} mr={10} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                        <VStack align="start">
                            <Text mb={2} fontWeight="bold">Markup Types:</Text>
                            <CheckboxGroup colorScheme="green" value={enabledStructureMenus} onChange={handleStructureMenuChange}>
                                <VStack align="start">
                                    {availableStructureMenus.map((key) => (
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
            <AttributeInputModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                tagName={currentTag}
                onSubmit={handleAttributeSubmit}
                additionalData={currentTag === 'bibl' ? biblOptions : undefined}
            />

        </>
    );
};

export default Editor;