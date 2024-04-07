/**
 * Validates if a tag can be inserted at the current cursor position or selection.
 * @param {string} docText - The entire XML document text.
 * @param {number} from - The starting position of the cursor or selection.
 * @param {number} to - The ending position of the cursor or selection, same as `from` if no selection.
 * @returns {Object} An object containing a boolean `isValid` and a `message`.
 */
function isValidTagInsertion(docText, from, to) {
    const isSingleTagInsertion = from === to;
    let contextValid = true;
    let message = "";

    try {
        // Surround docText with a root element if not already present
        const wrappedText = docText.includes("<root>") ? docText : `<root>${docText}</root>`;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(wrappedText, "application/xml");

        const errors = xmlDoc.getElementsByTagName("parsererror");
        if (errors.length > 0) {
            return { isValid: false, message: "XML Parsing Error: Invalid XML structure." };
        }

        if (isSingleTagInsertion) {
            // Contextual analysis for single tag insertion
            const preText = docText.substring(0, from);
            const postText = docText.substring(from);

            // Use the parser to check the structure before and after the insertion point
            const preDoc = parser.parseFromString(`${preText}<lb/>${postText}`, "application/xml");

            if (preDoc.getElementsByTagName("parsererror").length > 0 ) {
                contextValid = false;
                message = "Invalid position for single tag insertion. It breaks the XML structure.";
            }
        }

        // You can extend this logic to handle specific tags and contexts as per your requirements

        return { isValid: contextValid, message };
    } catch (error) {
        return { isValid: false, message: "Validation failed due to an unexpected error." };
    }
}


export default isValidTagInsertion;

