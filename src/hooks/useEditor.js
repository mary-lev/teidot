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

export const useEditor = (containerRef) => {
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        if (!editorInstance && containerRef.current) { // Check if the editor has not been initialized yet
            const loadDefaultXML = async () => {
                try {
                    const response = await fetch('/examples/poem.xml');
                    const defaultXML = await response.text();
                    initializeEditor(defaultXML);
                } catch (error) {
                    console.error("Failed to load default XML", error);
                    initializeEditor('<?xml version="1.0"?>\n<root>Initial content could not be loaded</root>');
                }
            };
            loadDefaultXML();
        }
        return () => {
            if (editorInstance) {
                editorInstance.destroy();
                setEditorInstance(null);
            }
        };
    }, [editorInstance]);
    

    const initializeEditor = (initialContent) => {
        if (!containerRef.current) return;

        console.log("Initializing editor with content:", initialContent);

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