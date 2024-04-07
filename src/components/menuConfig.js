import EditorMenu from './Menu/EditorMenu';
import SemanticMarkupMenu from './Menu/SemanticMarkupMenu';
import CriticalApparatusMenu from './Menu/CriticalApparatusMenu';
import TranscriptionMenu from './Menu/TranscriptionMenu';
import PoetryMenu from './Menu/PoetryMenu';
import DramaMenu from './Menu/DramaMenu';
import ProseMenu from './Menu/ProseMenu';
import CorrespondenceMenu from './Menu/CorrespondenceMenu';

export const genreMenus = {
    poetry: PoetryMenu,
    drama: DramaMenu,
    prose: ProseMenu,
    correspondence: CorrespondenceMenu,
};

export const structureMenus = {
    editorMenu: EditorMenu,
    semanticMarkupMenu: SemanticMarkupMenu,
    criticalApparatusMenu: CriticalApparatusMenu,
    transcriptionMenu: TranscriptionMenu,
};

// Add display names if needed for user-friendly menu names
export const menuDisplayNames = {
    // Structure Menus
    editorMenu: 'Editor Tools',
    semanticMarkupMenu: 'Semantic Markup Tools',
    criticalApparatusMenu: 'Critical Apparatus Tools',
    transcriptionMenu: 'Transcription Tools',
    // Genre Menus
    poetry: 'Poetry',
    drama: 'Drama',
    prose: 'Prose',
    correspondence: 'Correspondence',
};
