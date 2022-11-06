import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

export type InputProps = {
  value: string;
  error: string;
  isDisabled: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maxLength: number;
  placeholder?: string;
};

const TextInput = ({
  value,
  error,
  isDisabled,
  handleChange,
  name,
  maxLength,
  placeholder = 'Way Back When There Is No Blockchain...',
}: InputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name.toLowerCase()} fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
        {name}
      </FormLabel>
      <Input
        name={name.toLowerCase()}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isDisabled}
        color={'whiteAlpha.700'}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;
