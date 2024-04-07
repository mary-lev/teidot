import React from 'react';
import { Button, Tooltip, VStack } from '@chakra-ui/react';

const TagMenu = ({ onTagButtonClick, tagTypes }) => {
    return (
        <VStack spacing={4}>
            {Object.entries(tagTypes).map(([tagName, tagData]) => {
                if (tagData.variants) {
                    // Generate a button for each variant of the tag
                    return tagData.variants.map(variant => (
                        <Tooltip key={`${tagName}-${variant.attributesTemplate.type}`} label={variant.description} placement="auto">
                            <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick(tagName, variant.attributesTemplate)}>
                                {variant.buttonLabel}
                            </Button>
                        </Tooltip>
                    ));
                } else {
                    // Generate a single button for tags without variants
                    return (
                        <Tooltip key={tagName} label={tagData.description} placement="auto">
                            <Button colorScheme="teal" variant="outline" size="sm" onClick={() => onTagButtonClick(tagName)}>
                                {tagName}
                            </Button>
                        </Tooltip>
                    );
                }
            })}
        </VStack>
    );
};

export default TagMenu;
