import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageInput = () => {
  const [profileImage, setProfileImage] = useState('svg/noImage.svg');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const cropImage = () => {
  //   const [crop, setCrop] = useState({ x: 0, y: 0 });
  //   const [zoom, setZoom] = useState(1);

  //   const onCropCompleate = useCallback((croppedArea, croppedAreaPixels) => {
  //     console.log(croppedArea, croppedAreaPixels);
  //   }, []);

  //   return (
  //     <Cropper
  //       image={yourImage}
  //     />
  //   )
  // };

  // sorry
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const inputRef = useRef<HTMLInputElement>(null!);

  const onProfileButtonClick = () => {
    inputRef.current.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  };

  return (
    <Box w={'100%'}>
      <Box bg={'#171334'} w={'300px'} h={'400px'} mb={'30px'}>
        <Center>
          <Image
            src={profileImage}
            mt={profileImage === 'svg/noImage.svg' ? '180px' : 'none'}
            w={profileImage === 'svg/noImage.svg' ? '30px' : '300px'}
            h={profileImage === 'svg/noImage.svg' ? '30px' : '400px'}
          />
        </Center>
      </Box>

      {/* input button */}
      <Input hidden ref={inputRef} type={'file'} onChange={onFileInputChange} />
      <HStack>
        <Button
          borderRadius={'20px'}
          bgColor={'#bd3fc1'}
          color={'whiteAlpha.700'}
          _hover={{ bgColor: '#171334' }}
          onClick={onProfileButtonClick}
        >
          Input
        </Button>
        {/* ImageSelect button */}
        <Box>
          <Button
            borderRadius={'20px'}
            bgColor={'#bd3fc1'}
            color={'whiteAlpha.700'}
            _hover={{ bgColor: '#171334' }}
            onClick={onOpen}
          >
            Select Book Cover NFT
          </Button>
          <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size={'xl'}>
            <ModalOverlay />
            <ModalContent bgColor={'#3C3053'}>
              <ModalHeader color={'whiteAlpha.900'}>Book Caver NFTs</ModalHeader>
              <ModalCloseButton />
              <ModalBody my={'20%'}>
                <SimpleGrid columns={4} gap={5}>
                  {num.map((n) => {
                    return (
                      <Box>
                        <Image
                          src={`bookCover/${n}.png`}
                          w={'150px'}
                          h={'200px'}
                          onClick={() => {
                            setProfileImage(`bookCover/${n}.png`);
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
      </HStack>
    </Box>
  );
};
export default ImageInput;

const ImageSelect = () => {};
