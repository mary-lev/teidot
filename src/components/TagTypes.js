const tagTypes = {
    // Structural markup tags
    "p": "wrap",
    "div": "wrap",
    "head": "wrap",
    "lg": "wrap",
    "l": "wrap",
    "quote": "wrap",
    "lb/": "insert",
    "pb/": "insert",
    // Semantic markup tags
    "persName": "wrap",
    "placeName": "wrap",
    "date": "wrap",
    "orgName": "wrap",
    "roleName": "wrap",
    "title": "wrap",
    // Critical apparatus elements
    "note": "wrap",
    "sic": "wrap",
    "corr": "wrap",
    "add": "wrap",
    "del": "wrap",
    "supplied": "wrap",
    // Transcription elements
    "cb/": "insert",   // Column Break
    "fw": "wrap",      // Folio or Page Numbers, Running Headers
    "gap": "wrap",     // Gap in the Text
    "space": "insert", // Significant Space
    "choice": "wrap",  // Groups alternative encodings
    "orig": "wrap",    // Original Spelling or Wording
    "reg": "wrap",     // Regularized or Standardized Form
    // Drama-specific tags
    "sp": "wrap",        // Speech
    "speaker": "wrap",   // Speaker of a piece of dialogue

    // Correspondence-specific tags
    "opener": "wrap",    // Opening of a letter
    "closer": "wrap",    // Closing of a letter
    "address": "wrap",   // Address in correspondence
    "dateline": "wrap",  // Date of the letter
    "postscript": "wrap",// Postscript in a letter
    // Add more tags and their types here
};

export default tagTypes;