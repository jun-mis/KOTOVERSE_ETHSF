import { VStack, Text, Button, Flex, Box, HStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useNovelContract } from '@/hooks/useNovelContract';
import { NovelInputType } from '@/types/novels';
import {
  CONTENT_LENGTH,
  NOVEL_CONTENT_MAX_LENGTH,
  NOVEL_SUMMARY_MAX_LENGTH,
  NOVEL_TITLE_MAX_LENGTH,
  TITLE_LENGTH,
} from '@/utils/constants/numbers';
import { validateInput, validateNovelInfo } from '@/utils/validate';
import ContentInput from './ContentInput';
import useAuth from '@/context/auth';
import useResult from '@/hooks/useResult';
import { Fail, Success } from '../results';
import TextInput from './TextInput';
import Selector from './Selector';
import { CATEGORY_OPTIONS } from '@/utils/constants/category';
import { LANGUAGE_OPTIONS } from '@/utils/constants/language';
import RemainingLetter from './RemainingLetter';
import { TARGETAUDIENCE_OPTIONS } from '@/utils/constants/targetAudience';
import { COPYRIGHT_OPTIONS } from '@/utils/constants/copyRight';
import ImageInput from './ImageInput';
import CharacterInput from './CharacterInput';
import { makeStorageClient } from '../../utils/storage-client.js';

export type NovelFormProps = {
  existingTitle?: string;
};

type Props = {
  auth: boolean;
};

const NovelForm = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const { provider } = useAuth();
  const { setStatus, isSuccessOpen, isFailOpen } = useResult();

  const closeResultModal = () => {
    setStatus(undefined);
    location.reload();
  };

  const [novelInfo, setNovelInfo] = useState<NovelInputType>({
    title: undefined,
    content: undefined,
    summary: undefined,
    category: undefined,
    language: undefined,
    targetAudience: undefined,
    copyRight: undefined,
  });

  const [novelImgFiles, setNovelImgFiles] = useState<FileList | undefined>();

  const novelContract = useNovelContract();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNovelInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setNovelInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImgUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setNovelImgFiles(e.target.files!);
  }

  const handleImgUpload = async () => {
    const files = novelImgFiles;
    if (!files) return;
    const response = await storeFiles(files);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  }

  const storeFiles = async (files: FileList) => {
      const client = makeStorageClient()
      const cid = await client.put(files)
      console.log('stored files with cid:', cid)
      return cid
  }

  const handleMint = async () => {
    if (!provider || !novelContract) return;

    console.log('novelInfo : ', novelInfo);

    if (!validateNovelInfo(novelInfo)) return alert('Please check the infomation you wrote');

    setIsPending(true);

    try {
      const tx = await novelContract.createNovel(novelInfo, { gasLimit: 1000000 });

      const receipt = await provider.waitForTransaction(tx.hash);

      const uploadImgData = handleImgUpload();

      if (!uploadImgData) {
        setStatus('fail');
        return;
      }
      setStatus('success');
    } catch (e) {
      console.log(e);
      setStatus('fail');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Flex>
      <Box w={'100%'}>
        <ImageInput onImageUpdate={handleImgUpdate}/>
      </Box>
      <VStack spacing={5} w={'100%'}>
        <Success
          message={'Your transaction has successfully been made'}
          isOpen={isSuccessOpen}
          onClose={closeResultModal}
        />
        <Fail
          message={'Your transaction has not successfully been made. Please try again.'}
          isOpen={isFailOpen}
          onClose={() => setStatus(undefined)}
        />
        {/* TITLE */}

        <VStack w={'100%'} spacing={2}>
          <TextInput
            value={novelInfo.title || ''}
            name={'Title'}
            handleChange={handleChange}
            error={novelInfo.title === '' ? 'Please fill the title' : ''}
            isDisabled={isPending}
            maxLength={NOVEL_TITLE_MAX_LENGTH}
          />
          <RemainingLetter value={novelInfo.title} maxLength={NOVEL_TITLE_MAX_LENGTH} />
        </VStack>

        {/* SUMMARY */}
        <VStack w={'100%'} spacing={2}>
          <ContentInput
            value={novelInfo.summary || ''}
            name={'Summary'}
            handleChange={handleChange}
            error={novelInfo.summary === '' ? 'Please write the summary' : ''}
            isDisabled={isPending}
            maxLength={NOVEL_SUMMARY_MAX_LENGTH}
            placeholder={'This story starts with ...'}
          />
          <RemainingLetter value={novelInfo.summary} maxLength={NOVEL_SUMMARY_MAX_LENGTH} />
        </VStack>

        {/* CATEGORY */}
        <Selector
          name={'Category'}
          value={novelInfo.category}
          defaultValue={''}
          placeholder={'Select a category'}
          error={novelInfo.category === '' ? 'Please select category' : ''}
          handleChange={handleSelect}
          isDisabled={isPending}
          options={[...CATEGORY_OPTIONS]}
        />

        {/* LANGUAGE */}
        <Selector
          name={'Language'}
          value={novelInfo.language}
          defaultValue={''}
          placeholder={'Select a language'}
          error={novelInfo.language === '' ? 'Please select language' : ''}
          handleChange={handleSelect}
          isDisabled={isPending}
          options={[...LANGUAGE_OPTIONS]}
        />

        {/* CHARACTER */}
        <CharacterInput />

        {/* CONTENT */}
        <VStack w={'100%'} spacing={2}>
          <ContentInput
            value={novelInfo.content || ''}
            name={'Content'}
            handleChange={handleChange}
            error={novelInfo.content === '' ? 'Please write your part' : ''}
            isDisabled={isPending}
            maxLength={NOVEL_CONTENT_MAX_LENGTH}
          />
          <RemainingLetter value={novelInfo.content} maxLength={NOVEL_CONTENT_MAX_LENGTH} />
        </VStack>

        {/* TARGET AUDIENCE */}
        <Selector
          name={'TargetAudience'}
          value={novelInfo.targetAudience}
          defaultValue={''}
          placeholder={'Select a target audience'}
          error={novelInfo.category === '' ? 'Please select target audience' : ''}
          handleChange={handleSelect}
          isDisabled={isPending}
          options={[...TARGETAUDIENCE_OPTIONS]}
        />

        {/* COPYRIGHT */}
        <Selector
          name={'Copyright'}
          value={novelInfo.copyRight}
          defaultValue={''}
          placeholder={'Select a Copyright'}
          error={novelInfo.category === '' ? 'Please select Copyright' : ''}
          handleChange={handleSelect}
          isDisabled={isPending}
          options={[...COPYRIGHT_OPTIONS]}
        />

        {props.auth ? (
          <>
            <Button isDisabled={!novelInfo.title || !novelInfo.content} isLoading={isPending} onClick={handleMint}>
              Create Novel
            </Button>
          </>
        ) : (
          <>
            <Text color={'whiteAlpha.700'}>Please authenticate using WorldCoin in order to post</Text>
          </>
        )}
      </VStack>
    </Flex>
  );
};

export default NovelForm;
