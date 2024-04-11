export const addNewBiblToXml = (editorInstance, newBiblId, newBiblText, setEditorContent) => {
    if (!editorInstance) {
        console.error("Editor instance not available.");
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(editorInstance.state.doc.toString(), "text/xml");
    let listBibl = xmlDoc.querySelector('listBibl');

    if (!listBibl) {
        listBibl = xmlDoc.createElement('listBibl');
        const sourceDesc = xmlDoc.querySelector('sourceDesc') || xmlDoc.querySelector('teiHeader');
        if (sourceDesc) {
            sourceDesc.appendChild(listBibl);
        } else {
            console.error("Cannot find a suitable parent for listBibl.");
            return;
        }
    }

    const newBibl = xmlDoc.createElement('bibl', null);
    newBibl.setAttribute('xml:id', newBiblId);
    newBibl.textContent = newBiblText;
    listBibl.appendChild(newBibl);

    const serializer = new XMLSerializer();
    const newXmlString = serializer.serializeToString(xmlDoc);
    setEditorContent(newXmlString); // Assuming this function updates the editor's content appropriately

    // Reset states if needed, might need to handle this part differently depending on your setup
};


export const addItemToList = (editorInstance, newItemType, newItemId, newItemText, setEditorContent) => {
    console.log("Adding new item to list:", newItemType, newItemId, newItemText);
    const parser = new DOMParser();
    const serializer = new XMLSerializer();
    const xmlDoc = parser.parseFromString(editorInstance.state.doc.toString(), "application/xml");

    let parentElement = xmlDoc.querySelector(`list${newItemType}`);
    if (!parentElement) {
        parentElement = xmlDoc.createElement(`list${newItemType}`);
        const sourceDesc = xmlDoc.querySelector('sourceDesc') || xmlDoc.querySelector('teiHeader');
        sourceDesc.appendChild(parentElement);
    }

    const newItem = xmlDoc.createElement(newItemType.charAt(0).toLowerCase() + newItemType.slice(1));

    if (newItemId) newItem.setAttribute('xml:id', newItemId);
    newItem.textContent = newItemText;
    parentElement.appendChild(newItem);

    const newXmlString = serializer.serializeToString(xmlDoc);
    setEditorContent(newXmlString);
};
