const TagTypes = {
    "p": {
        type: "wrap",
        description: "Paragraph, used for basic text structuring.",
    },
    "div": {
        type: "wrap",
        description: "Division, used for structuring texts. Can have different types.",
        variants: [
            {
                attributesTemplate: { type: "act" },
                description: "Act in a play.",
                buttonLabel: "Act",
            },
            {
                attributesTemplate: { type: "scene" },
                description: "Scene in a play.",
                buttonLabel: "Scene",
            },
            // Add other 'div' variants as needed
        ]
    },
    "head": {
        type: "wrap",
        description: "Heading, used for titles or headings within the text.",
    },
    "lg": {
        type: "wrap",
        description: "Line group, used for grouping lines in verse, often to form stanzas or other structured poetic units.",
    },
    "l": {
        type: "wrap",
        description: "Line, used for individual lines of verse.",
    },
    "quote": {
        type: "wrap",
        description: "Quote, used for block quotations or sections of text cited from other sources.",
    },
    "lb/": {
        type: "insert",
        description: "Line break, used to indicate a line break in verse or to preserve the original lineation of a source text.",
        selfClosing: true,
    },
    "pb/": {
        type: "insert",
        description: "Page break, used to indicate the location of a page break in the original source material.",
        selfClosing: true,
    },
    // Semantic markup tags
    "persName": {
        type: "wrap",
        description: "Personal name, used for marking up the names of individuals to distinguish them from other text elements.",
    },
    "placeName": {
        type: "wrap",
        description: "Place name, used for marking up geographical locations to facilitate specific processing, like geolocation or mapping.",
    },
    "date": {
        type: "wrap",
        description: "Date, used for marking up calendar dates in any format. This can help with chronological sorting and timeline creation.",
    },
    "orgName": {
        type: "wrap",
        description: "Organization name, used for marking up the names of organizations, institutions, companies, etc., for clarity and potential linkage to external datasets.",
    },
    "roleName": {
        type: "wrap",
        description: "Role name, used for marking up terms that describe roles, titles, or positions held by individuals, especially useful in historical or biographical texts.",
    },
    "title": {
        type: "wrap",
        description: "Title, used for marking up the titles of works (books, articles, songs, etc.), contributing to clear bibliographic referencing and intertextual linking.",
    },
    // Critical apparatus elements
    "note": {
        type: "wrap",
        description: "Note, used for including additional information by an editor or author that is supplementary to the main text.",
    },
    "sic": {
        type: "wrap",
        description: "Sic, used to indicate that an unusual spelling or phrase in the text is reproduced from the source material accurately, implying it is not a transcription error.",
    },
    "corr": {
        type: "wrap",
        description: "Correction, used to mark a correction made to the text that replaces an error found in the source material.",
    },
    "add": {
        type: "wrap",
        description: "Addition, used to enclose text that has been inserted by an editor, author, or scribe into the document where it was not originally present.",
    },
    "del": {
        type: "wrap",
        description: "Deletion, used to mark text that has been stricken or removed from the original document, often still legible in the source.",
    },
    "supplied": {
        type: "wrap",
        description: "Supplied, used for wrapping text that has been added by an editor or transcriber where the source text is missing or illegible, often due to damage or omission.",
    },
    // Transcription elements
    "cb/": {
        type: "insert",
        description: "Column Break, used to indicate a break between columns in the original source material.",
        selfClosing: true,
    },
    "fw": {
        type: "wrap",
        description: "Folio or Page Numbers, Running Headers, used to mark the location and text of folio or page numbers and running headers in the original material.",
    },
    "gap": {
        type: "wrap",
        description: "Gap in the Text, used to indicate an area in the original text where material has been omitted, typically due to damage or illegibility.",
    },
    "space": {
        type: "insert",
        description: "Significant Space, used to encode the presence of a significant space in the original material, such as a wide gap between words or phrases not present in the modern transcription.",
        selfClosing: true,
    },
    "choice": {
        type: "wrap",
        description: "Choice, used to group alternative encodings of the same text, allowing for the representation of textual variations, corrections, and regularizations.",
    },
    "orig": {
        type: "wrap",
        description: "Original Spelling or Wording, used within a <choice> tag to mark the original spelling or wording as found in the source text.",
    },
    "reg": {
        type: "wrap",
        description: "Regularized or Standardized Form, used within a <choice> tag to provide a regularized or standardized form of the text for consistency or clarity.",
    },

    // Drama-specific tags...
    
    "sp": {
        type: "wrap",
        description: "Speech, used to mark individual speeches or dialogue portions within a play or dramatic text.",
        groups: ["drama"],
    },
    "speaker": {
        type: "wrap",
        description: "Speaker, used to identify the speaker of a given line or dialogue portion in a play or dramatic text.",
        groups: ["drama"],
    },

    // Correspondence-specific tags...
    
    "opener": {
        type: "wrap",
        description: "Opening of a letter, used to mark the opening phrases or salutation at the beginning of a piece of correspondence.",
        groups: ["correspondence"],
    },
    "closer": {
        type: "wrap",
        description: "Closing of a letter, used to mark the closing phrases or sign-off at the end of a piece of correspondence.",
        groups: ["correspondence"],
    },
    "address": {
        type: "wrap",
        description: "Address in correspondence, used to mark the address lines typically found at the beginning or end of a letter, including the recipient's and sender's addresses.",
        groups: ["correspondence"],
    },
    "dateline": {
        type: "wrap",
        description: "Date of the letter, used to mark the date line usually found at the beginning or end of a letter indicating when it was written.",
        groups: ["correspondence"],
    },
    "postscript": {
        type: "wrap",
        description: "Postscript in a letter, used to mark any additional notes or messages added after the main body of the letter, typically preceded by 'P.S.'",
        groups: ["correspondence"],
    },

    // Other tags...
};

export default TagTypes;
