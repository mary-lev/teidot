import React from 'react';
import { Button } from '@chakra-ui/react';

// Inside SaveButton.js
const SaveButton = ({ getEditorContent }) => {
    const handleSave = () => {
        const editorContent = getEditorContent(); // Fetch content when needed
        const blob = new Blob([editorContent], { type: 'text/xml' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "document.xml"; // Name of the file to save
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    return <Button p={6} colorScheme="teal" onClick={handleSave}>Download</Button>;
};


export default SaveButton;
