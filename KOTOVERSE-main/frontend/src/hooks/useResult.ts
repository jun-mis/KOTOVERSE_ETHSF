import { useDisclosure } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {};

const useResult = () => {
  const [status, setStatus] = useState<'success' | 'fail'>();
  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onClose: onSuccessClose } = useDisclosure();
  const { isOpen: isFailOpen, onOpen: onFailOpen, onClose: onFailClose } = useDisclosure();

  const resetStatus = useCallback(() => {
    onSuccessClose();
    onFailClose();
  }, [status]);

  useEffect(() => {
    if (!status) {
      resetStatus();
      return;
    }

    if (status == 'success') {
      onSuccessOpen();
      return;
    }

    if (status == 'fail') {
      onFailOpen();
    }

    return () => {};
  }, [status]);

  return { setStatus, isSuccessOpen, isFailOpen };
};

export default useResult;
