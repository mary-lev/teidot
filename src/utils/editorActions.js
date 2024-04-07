import isValidTagInsertion from '../utils/Validation';


export const handleTagWrapButtonClick = (editorInstance, tagName, attributes) => {
    if (!editorInstance) return { error: "Editor instance not available." };

    const { from, to } = editorInstance.state.selection.main;
    const docText = editorInstance.state.doc.toString();
    const isEmptySelection = from === to;

    const attributeString = Object.entries(attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    const openingTag = attributeString ? `<${tagName} ${attributeString}>` : `<${tagName}>`;
    const closingTag = `</${tagName}>`;

    let insertText;
    if (isEmptySelection) {
        insertText = `${openingTag}${closingTag}`;
    } else {
        const selectedText = editorInstance.state.sliceDoc(from, to);
        insertText = `${openingTag}${selectedText}${closingTag}`;
    }

    const transaction = editorInstance.state.update({
        changes: {
            from: from,
            to: isEmptySelection ? from : to,
            insert: insertText
        },
        selection: isEmptySelection ? { anchor: from + openingTag.length } : undefined
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