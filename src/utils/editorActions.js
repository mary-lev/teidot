const insertTagIntoEditor = (editorInstance, tagName, attributes, selectedText = '') => {
    const attributeString = Object.entries(attributes)
        .filter(([, value]) => value !== undefined) // Exclude attributes with undefined values
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    console.log("Attribute String:", attributeString);
    const openingTag = `<${tagName} ${attributeString}>`;
    const closingTag = `</${tagName}>`;
    const insertText = selectedText ? `${openingTag}${selectedText}${closingTag}` : `${openingTag}${closingTag}`;

    return editorInstance.state.update({
        changes: { from: editorInstance.state.selection.main.from, insert: insertText },
        selection: { anchor: editorInstance.state.selection.main.from + openingTag.length }
    });
};

// Use insertTagIntoEditor in your action handlers
export const handleTagWithUserAttributes = (editorInstance, tagName, attributes) => {
    if (!editorInstance) return { error: "Editor instance not available." };
    console.log("Handling tag with user attributes:", tagName, attributes);

    const {from, to} = editorInstance.state.selection.main;
    const isEmptySelection = from === to;
    const selectedText = isEmptySelection ? '' : editorInstance.state.sliceDoc(from, to);

    const attributeString = Object.entries(attributes)
        .filter(([, value]) => value !== undefined) // Exclude attributes with undefined values
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    console.log("Attribute String:", attributeString);
    const openingTag = attributeString ? `<${tagName} ${attributeString}>` : `<${tagName}>`;
    const closingTag = `</${tagName}>`;
    const insertText = selectedText ? `${openingTag}${selectedText}${closingTag}` : `${openingTag}${closingTag}`;

    try {
        const transaction = editorInstance.state.update({
            changes: { from, to, insert: insertText }, // Ensure 'to' is used to replace the selected text
            // Adjust the selection to be after the inserted tag if the selection is not empty
            selection: isEmptySelection ? undefined : { anchor: from + insertText.length }
        });
        editorInstance.dispatch(transaction);
        return { success: true };
    } catch (error) {
        console.error("Error dispatching transaction:", error);
        return { error: "Error dispatching transaction." };
    }
};

export const handleTagWithUserSelectAttributes = (editorInstance, tagName, currentAttributeKey, currentAttributeValue) => {
    if (!editorInstance) return { error: "Editor instance not available." };
    console.log("Handling tag with user selected attributes:", tagName, currentAttributeKey, currentAttributeValue);

    const {from, to} = editorInstance.state.selection.main;
    const isEmptySelection = from === to;
    const selectedText = isEmptySelection ? '' : editorInstance.state.sliceDoc(from, to);

    // Correct attribute formatting
    const openingTag = `<${tagName} ${currentAttributeValue}="#${currentAttributeKey.attribute}">`;
    const closingTag = `</${tagName}>`;
    const insertText = `${openingTag}${selectedText}${closingTag}`;

    try {
        const transaction = editorInstance.state.update({
            changes: { from, to, insert: insertText }, // Ensure 'to' is used to replace the selected text
            // Adjust the selection to be after the inserted tag if the selection is not empty
            selection: isEmptySelection ? undefined : { anchor: from + insertText.length }
        });
        editorInstance.dispatch(transaction);
        return { success: true };
    } catch (error) {
        console.error("Error dispatching transaction:", error);
        return { error: "Error dispatching transaction." };
    }
};



export const handleSingleTagInsertButtonClick = (editorInstance, tagName, attributes) => {
    if (!editorInstance) return { error: "Editor instance not available." };

    const { from } = editorInstance.state.selection.main;
    const attributeString = Object.entries(attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    const insertText = attributeString ? `<${tagName} ${attributeString}>` : `<${tagName}>`;

    const transaction = editorInstance.state.update({
        changes: { from, insert: insertText }
    });

    try {
        // Attempt to dispatch the transaction
        editorInstance.dispatch(transaction);
        return { success: true };
    } catch (error) {
        console.error("Error dispatching transaction:", error);
        return { error: "Error dispatching transaction." };
    }
};
