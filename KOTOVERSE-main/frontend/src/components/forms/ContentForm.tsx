import { Button, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { CONTENT_LENGTH } from '@/utils/constants/numbers';
import { validateInput } from '@/utils/validate';
import ContentInput from './ContentInput';

export type ContentFormProps = {
  handleMint: (content: string) => Promise<void>;
  isPending: boolean;
  part: number;
};

const ContentForm = ({ handleMint, isPending, part }: ContentFormProps) => {
  const [content, setContent] = useState<string | undefined>();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleMintClick = async () => {
    if (!validateInput(content, CONTENT_LENGTH)) return alert('Please input a valid content');

    await handleMint(content);
  };

  const isError = content === '' || (content !== undefined && content.trim().length === 0);

  return (
    <VStack pt={5} spacing={5} w={'100%'}>
      {/* CONTENT */}
      <ContentInput
        value={content || ''}
        name={`Part ${part + 1}`}
        handleChange={handleChange}
        error={content === '' ? 'Please enter content' : ''}
        isDisabled={isPending}
        maxLength={CONTENT_LENGTH.max}
      />
      <Button isDisabled={isError || !content} onClick={handleMintClick} isLoading={isPending}>
        Add Content
      </Button>
    </VStack>
  );
};

export default ContentForm;
