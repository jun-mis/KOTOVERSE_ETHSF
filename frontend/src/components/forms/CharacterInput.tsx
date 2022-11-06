import {
  FormControl,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  ModalFooter,
  useDisclosure,
  Textarea,
  Avatar,
  Input,
  SimpleGrid,
  Image,
  HStack,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

type CharacterType = {
  avatar: string | null;
  name: string | null;
} | null;

const CharacterInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const characterMeta: CharacterType[] | null = [];
  //   const [name, setName] = useState<string | null>(null);
  //   const [imgPath, setImgPath] = useState<string | null>(null);
  //   const [character, setCharacter] = useState<null | CharacterType>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  //   const [avatar, setAvatar] = useState<string | null | undefined>('');
  //   const [characterName, setCharacterName] = useState<string | null | undefined>('');

  //   const inputRef = useRef<HTMLInputElement>(null!);
  //   const onProfileButtonClick = () => {
  //     inputRef.current.click();
  //   };

  //   const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!e.target.files) return;
  //     const fileObject = e.target.files[0];
  //     setImgPath(window.URL.createObjectURL(fileObject));
  //   };

  //sorry
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //   useEffect(() => {
  //     characterMeta.push(character);
  //     setAvatar(character?.avatar);
  //     setCharacterName(character?.name);
  //   }, [character]);

  return (
    <>
      <Box w={'100%'}>
        <FormControl>
          <FormLabel fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
            Main Character
          </FormLabel>
        </FormControl>
        <HStack my={'30px'} w={'100%'}>
          <Avatar size={'xl'} ml={'20px'} src={profileImage} />
        </HStack>
        <Button
          borderRadius={'20px'}
          bgColor={'#bd3fc1'}
          color={'whiteAlpha.700'}
          _hover={{ bgColor: '#171334' }}
          onClick={onOpen}
        >
          Select Character NFT
        </Button>
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size={'xl'}>
          <ModalOverlay />
          <ModalContent bgColor={'#3C3053'}>
            <ModalHeader color={'whiteAlpha.900'}>Character NFTs</ModalHeader>
            <ModalCloseButton />
            <ModalBody my={'20%'}>
              <SimpleGrid columns={4} gap={5}>
                {num.map((n) => {
                  return (
                    <Box>
                      <Image
                        src={`character/${n}.png`}
                        w={'150px'}
                        h={'200px'}
                        onClick={() => {
                          //   setProfileImage(`character/${n}.png`);
                          setProfileImage(`character/${n}.png`);
                          onClose();
                        }}
                      />
                    </Box>
                  );
                })}
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="white" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      {/* <FormControl>
        <FormLabel fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
          Character
        </FormLabel>
      </FormControl>
      {avatar !== '' ? (
        <></>
      ) : (
        <HStack border={'1px'} borderColor={'whiteAlpha.600'} p={'10px'} borderRadius={'10px'} w={'100%'}>
          <Avatar size={'sm'} ml={'20px'} src={avatar ? avatar : ''} />
          <Text color={'whiteAlpha.800'} fontWeight={'bold'} pl={'10px'}>
            {characterName ? characterName : ''}
          </Text>
        </HStack>
      )}
      <Box>
        <Button
          borderRadius={'20px'}
          border={'1px'}
          bg={'none'}
          color={'whiteAlpha.700'}
          _hover={{ bgColor: '#171334' }}
          onClick={onOpen}
        >
          Add
          <AiOutlinePlus />
        </Button>
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size={'xl'}>
          <ModalOverlay />
          <ModalContent bgColor={'#3C3053'}>
            <ModalCloseButton />
            <ModalBody my={'10px'}>
              <FormControl>
                <FormLabel fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
                  Upload Avatar
                </FormLabel>
                <Input hidden ref={inputRef} type={'file'} onChange={onFileInputChange} />
                <Avatar name="" src={imgPath ? imgPath : ''} onClick={onProfileButtonClick} />

                <FormLabel fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'} mt={'30px'}>
                  Upload Character
                </FormLabel>
                <Textarea
                  color={'whiteAlpha.800'}
                  fontWeight={'semibold'}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="white"
                bgColor={'pink.600'}
                borderRadius={'20px'}
                mr={3}
                onClick={() => {
                  const info: CharacterType = {
                    name: name,
                    avatar: imgPath,
                  };
                  setCharacter(info);
                  onClose();
                }}
              >
                Add
              </Button>
              <Button colorScheme="white" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box> */}
    </>
  );
};

export default CharacterInput;
