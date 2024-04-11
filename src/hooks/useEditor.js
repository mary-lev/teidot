import { useState, useEffect } from 'react';
import { EditorState } from '@codemirror/state';
import {
    EditorView,
    keymap,
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    rectangularSelection,
    lineNumbers,
} from '@codemirror/view';
// import { color } from '@uiw/codemirror-extensions-color';
import { autocompletion, completionKeymap, closeBrackets } from '@codemirror/autocomplete';
import { foldGutter, foldKeymap, bracketMatching, indentOnInput } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { xml } from '@codemirror/lang-xml';

export const useEditor = (containerRef, defaultXMLname) => {
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        if (!editorInstance && containerRef.current) { 
            const loadDefaultXML = async () => {
                let defaultXML = '<?xml version="1.0"?>\n<root>Initial content could not be loaded</root>';
                try {
                    // Use the defaultXMLname in the fetch URL if it's provided
                    const filePath = defaultXMLname ? `/examples/${defaultXMLname}.xml` : '/examples/poem.xml';
                    const response = await fetch(filePath);
                    if(response.ok) {
                        defaultXML = await response.text();
                    } else {
                        console.error(`Failed to load ${filePath}`, response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching default XML", error);
                }
                initializeEditor(defaultXML);
            };
            loadDefaultXML();
        }
        return () => {
            if (editorInstance) {
                // Assuming CodeMirror 6, you might need to manually clean up the editor view
                editorInstance.destroy(); // This is a placeholder. Adjust based on actual API.
                setEditorInstance(null);
            }
        };
    }, [editorInstance, defaultXMLname]);
    

    const initializeEditor = (initialContent) => {
        if (!containerRef.current) return;

        const startState = EditorState.create({
            doc: initialContent,
            extensions: [
                    lineNumbers(),
                    highlightSpecialChars(),
                    drawSelection(),
                    bracketMatching(),
                    autocompletion(),
                    rectangularSelection(),
                    foldGutter(),
                    xml(),
                    indentOnInput(),
                    oneDark,
                    EditorView.lineWrapping,
                    EditorView.updateListener.of(update => {
                        if (update.docChanged) {
                            // Potentially handle document changes
                        }
                    })
                ]
            });

            const view = new EditorView({
            state: startState,
            parent: containerRef.current,
        });

        setEditorInstance(view);

    };

    const setEditorContent = (newContent) => {
        if (editorInstance) {
            editorInstance.dispatch({
                changes: { from: 0, to: editorInstance.state.doc.length, insert: newContent }
            });
        }
    };
    return { editorInstance, setEditorContent };
};