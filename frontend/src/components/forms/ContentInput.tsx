import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { InputProps } from './TextInput';

type ContentInputProps = Omit<InputProps, 'handleChange'> & {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const ContentInput = ({
  value,
  error,
  isDisabled,
  handleChange,
  name,
  placeholder = 'Once upon a time...',
  maxLength,
}: ContentInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name.toLowerCase()} fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
        {name}
      </FormLabel>
      <Textarea
        name={name.toLowerCase()}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isDisabled}
        rows={5}
        color={'whiteAlpha.700'}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ContentInput;
