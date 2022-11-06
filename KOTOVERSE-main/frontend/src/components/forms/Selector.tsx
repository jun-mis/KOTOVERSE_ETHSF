import { FormControl, FormErrorMessage, FormLabel, Select, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

type SelectorProps = {
  name: string;
  value: string | undefined;
  error: string;
  defaultValue: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isDisabled: boolean;
  options: string[];
};

const Selector = ({
  name,
  value,
  error,
  defaultValue,
  placeholder,
  handleChange,
  isDisabled,
  options,
}: SelectorProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name.toLowerCase()} fontSize={'lg'} fontWeight={700} color={'whiteAlpha.800'}>
        {name}
      </FormLabel>
      <Select
        name={name.toLowerCase()}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        isDisabled={isDisabled}
        color={'whiteAlpha.700'}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Selector;
