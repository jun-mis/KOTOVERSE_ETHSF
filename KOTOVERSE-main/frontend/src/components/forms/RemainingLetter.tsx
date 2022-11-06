import React, { useCallback } from 'react';
import { Text } from '@chakra-ui/react';

type RemainingLetterProps = {
  value: string | undefined;
  maxLength: number;
};

const RemainingLetter = React.memo(({ value, maxLength }: RemainingLetterProps) => {
  const remainingLetters = useCallback((value: string | undefined, maxLength: number) => {
    if (!value) return maxLength;

    return maxLength - value.length;
  }, []);

  return (
    <Text w={'100%'} fontSize={'sm'} textAlign={'right'} color={'gray'}>
      Remaining {remainingLetters(value, maxLength)} letters
    </Text>
  );
});

export default RemainingLetter;
