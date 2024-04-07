import React, { useState } from 'react';
import {
    Text,
    Box,
    Flex,
    Spacer
} from '@chakra-ui/react';

const NavAdmin = () => {
    const [scroll] = useState(false);

    return (
        <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            border={15}
            p="6"
            mb="6"
            boxShadow={scroll ? 'base' : 'none'}
            position="sticky" top="0"
            zIndex="sticky"
            h="8vh"
            w="full"
            bg={'teal.500'}
        >
            <Spacer />
            {/* Navigation Text or Links */}
            <Box>
                <Text
                    fontSize="2xl" 
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="'Roboto', sans-serif"
                    color="white"  // Added for better visibility against the blue background
                >
                    TEI Editor
                </Text>
            </Box>
        </Flex>
    );
};

export default NavAdmin;
