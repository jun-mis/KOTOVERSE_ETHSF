import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { ReactNode } from 'react';
import { SOCIAL_LINKS } from '@/utils/constants/links';

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('gray.800', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      target={'_blank'}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <Box
      //  bg={useColorModeValue('black', 'gray.900')}
      bgColor={'none'}
      color={useColorModeValue('white', 'gray.200')}
      borderTop={'1px'}
      borderColor={'blue.800'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>©Pit-Step, Inc.</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={SOCIAL_LINKS.TWITTER}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Discord'} href={SOCIAL_LINKS.DISCORD}>
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
