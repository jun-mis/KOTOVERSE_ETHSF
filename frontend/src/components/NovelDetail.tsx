import React, { useEffect, useState } from 'react';
import { NovelContentType, NovelSnippetType } from '@/types/novels';
import { useParams, useLocation } from 'react-router-dom';
import { Heading, Text, VStack, Button, useDisclosure, Center, useClipboard, Badge } from '@chakra-ui/react';
import { useNovelContract } from '@/hooks/useNovelContract';
import useAuth from '@/context/auth';
import ContentForm from './forms/ContentForm';
import ListContentForm from './modals/ListContentForm';
import { ethers } from 'ethers';
import ContentList from './lists/content/ContentList';
import { useMarketPlaceContract } from '@/hooks/useMarketPlaceContract';
import Loading from './common/Loading';
import useResult from '@/hooks/useResult';
import { Success, Fail } from './results';
import { shortenAddress } from '@/utils/address';
import { formatDate, toDate } from '@/utils/dates';
import CompleteModal from './modals/CompleteModal';
import SendClapBtn from './SendClapBtn';
import Save from '../components/common/Save';

interface NovelDetailState {
  novel: NovelSnippetType;
}

const NovelDetail = () => {
  const [novelContents, setNovelContents] = useState<NovelContentType[]>();
  const [latestContent, setLatestContent] = useState<any>();
  const [isPending, setIsPending] = useState(false);
  const { accountId, provider } = useAuth();
  const { setStatus, isSuccessOpen, isFailOpen } = useResult();

  const { isOpen: isListModalOpen, onOpen: onListModalOpen, onClose: onListModalClose } = useDisclosure();
  const { isOpen: isCompleteModalOpen, onOpen: onCompleteModalOpen, onClose: onCompleteModalClose } = useDisclosure();
  const [txMessage, setTxMessage] = useState('');

  const closeResultModal = () => {
    setStatus(undefined);
    location.reload();
  };

  const [availableOptions, setAvailableOptions] = useState({
    canAddContent: false,
    canSellContent: false,
    canBuyContent: false,
    canComplete: false,
    canCancelListing: false,
  });

  const novelContract = useNovelContract();
  const marketContract = useMarketPlaceContract();

  const { id } = useParams();
  // const { novel } = useLocation().state as NovelDetailState;
  const novel = {title: 'Hacking to the future', createdAt: '20200220', creator: "0xefF79038630484934247454857693045", summary: 'This is the summary', isCompleted: true}
  const checkIfAllowedToComplete = async (novelId: string): Promise<boolean> => {
    if (!novelContract) return false;

    try {
      return await novelContract.isAllowedToComplete(novelId);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const load = async () => {
      console.log('detail rendered');

      if (!id || !novelContract || !marketContract) return;

      try {
        const novelContents = await novelContract.getAllNovelContents(id);
        const lastIndex = novelContents.length - 1;
        const lastContent = novelContents[lastIndex];
        const lastItemOwner = await novelContract.ownerOf(lastContent.tokenId);
        const itemId = await marketContract.tokenIdToItemId(lastContent.tokenId);
        const canAddContent = await novelContract.canAddContent(lastContent.tokenId);
        const canComplete = await checkIfAllowedToComplete(id);

        // TODO: DEFINE TYPES
        let listedItem: any = {};

        if (itemId) {
          const item = await marketContract.items(itemId);
          listedItem = { ...item };
        }

        setNovelContents(novelContents);
        setLatestContent({ ...listedItem, ...lastContent });

        const canSellContent =
          accountId === lastItemOwner &&
          lastItemOwner === lastContent.creator &&
          itemId.toNumber() === 0 &&
          canComplete;
        const canCancelListing = canComplete && !canSellContent && !canAddContent; // only allows cancelling while account is token owner and token is listed

        setAvailableOptions({
          canBuyContent: lastItemOwner !== accountId && itemId.toNumber() > 0 && !listedItem.isSold,
          canComplete: canComplete && !canCancelListing,
          canCancelListing,
          canSellContent,
          canAddContent,
        });
      } catch (e) {
        console.error('Novel detail error ', e);
        openFailModal();
      }
    };

    load();
  }, [id, accountId, novelContract, marketContract]);

  const openSuccessModal = (message: string) => {
    setTxMessage(message);
    setStatus('success');
  };
  const openFailModal = () => {
    setTxMessage('Something went wrong during the transaction.\n Please try again');
    setStatus('fail');
  };

  const handleSell = async (price: string) => {
    if (!novelContract || !marketContract || !provider) return;

    setIsPending(true);

    const priceInMATIC = ethers.utils.parseEther(price);

    try {
      const approvedAccount = await novelContract.getApproved(latestContent.tokenId);

      if (approvedAccount != marketContract.address) {
        await novelContract.approve(marketContract.address, latestContent.tokenId);
      }

      const tx = await marketContract.listItem(latestContent.tokenId, priceInMATIC, { gasLimit: 200000 });

      const receipt = await provider.waitForTransaction(tx.hash);

      if (!receipt) {
        openFailModal();
        return;
      }

      onListModalClose();
      openSuccessModal('Your novel content has successfully been listed on a merketplace');
    } catch (e) {
      console.log('handleSell error: ', e);
    } finally {
      setIsPending(false);
    }
  };

  const handleBuy = async () => {
    if (!marketContract || !provider) return;

    setIsPending(true);

    try {
      const tx = await marketContract.buyItem(latestContent.tokenId, { value: latestContent.price });

      const receipt = await provider?.waitForTransaction(tx.hash);
      if (!receipt) {
        openFailModal();
        return;
      }

      openSuccessModal("You purchased the novel content. Let's write the next story.");
    } catch (e) {
      openFailModal();
      console.log('e', e);
    } finally {
      setIsPending(false);
    }
  };

  const handleMint = async (content: string) => {
    if (!novelContract || !id) return;

    const parentId = latestContent.parentId.toNumber();
    const tokenId = latestContent.tokenId.toNumber();

    setIsPending(true);

    try {
      const tx = await novelContract.addContent(id, Math.max(parentId, tokenId), content, { gasLimit: 400000 });

      const receipt = await provider?.waitForTransaction(tx.hash);
      if (!receipt) {
        openFailModal();
        return;
      }
      setStatus('success');
    } catch (e) {
      console.error('handleMint ERROR', e);
    } finally {
      setIsPending(false);
    }
  };

  const handleComplete = async () => {
    if (!novelContract || !id || !availableOptions.canComplete) return;

    setIsPending(true);

    try {
      const tx = await novelContract.completeNovel(id, { gasLimit: 150000 });

      const receipt = await provider?.waitForTransaction(tx.hash);

      if (!receipt) {
        openFailModal();
        return;
      }

      openSuccessModal('You successfully completed the novel.');
    } catch (e) {
      openFailModal();
      console.log('COMPLETE NOVEL ERROR: ', e);
    } finally {
      setIsPending(false);
    }
  };

  const handleCancelListing = async () => {
    if (!marketContract || !novelContract || !id || !availableOptions.canCancelListing) return;

    setIsPending(true);

    try {
      await novelContract.approve(ethers.constants.AddressZero, latestContent.tokenId);

      const tx = await marketContract.cancelItem(latestContent.tokenId, { gasLimit: 100000 });

      const receipt = await provider?.waitForTransaction(tx.hash);

      if (!receipt) {
        openFailModal();
        return;
      }

      openSuccessModal('You successfully cancelled listing an item');
    } catch (e) {
      openFailModal();
      console.log('CCANCEL ITEM ERROR: ', e);
    } finally {
      setIsPending(false);
    }
  };

  if (!novelContents)
    return (
      <Center w={'100%'} h={'100%'}>
        <Loading />
      </Center>
    );

  return (
    <>
      <Success message={txMessage} isOpen={isSuccessOpen} onClose={closeResultModal} />
      <Fail message={txMessage} isOpen={isFailOpen} onClose={() => setStatus(undefined)} />
      {/* MODALs */}
      <ListContentForm isOpen={isListModalOpen} onSave={handleSell} onClose={onListModalClose} isPending={isPending} />
      <CompleteModal
        novelName={novel.title}
        isOpen={isCompleteModalOpen}
        onComplete={handleComplete}
        onClose={onCompleteModalClose}
        isPending={isPending}
      />

      {/* CONTENTS */}
      <VStack spacing={10} w={'100%'} h={'100%'}>
        <NovelDetailHeading novel={novel} />

        <VStack my={5} w={'100%'} spacing={5}>
          {novelContents.length > 0 && <ContentList novelContents={novelContents} />}
          {availableOptions.canAddContent && (
            <ContentForm handleMint={handleMint} isPending={isPending} part={novelContents.length} />
          )}
          {availableOptions.canSellContent && (
            <Button onClick={onListModalOpen} isLoading={isPending}>
              SELL
            </Button>
          )}
          {availableOptions.canBuyContent && (
            <VStack>
              {latestContent.price && (
                <Text color={'whiteAlpha.800'}>{ethers.utils.formatEther(latestContent.price.toString())}MATIC</Text>
              )}

              <Button onClick={handleBuy} isLoading={isPending}>
                BUY
              </Button>
            </VStack>
          )}
          {availableOptions.canComplete && (
            <Button onClick={onCompleteModalOpen} disabled={isPending}>
              Complete
            </Button>
          )}
          {availableOptions.canCancelListing && (
            <Button onClick={handleCancelListing} isLoading={isPending}>
              Cancel Listing
            </Button>
          )}
          <SendClapBtn channelId={import.meta.env.VITE_PUSH_CHANNEL_ID} recipientId={novel.creator} />
        </VStack>
      </VStack>
    </>
  );
};

export const NovelDetailHeading = ({
  novel: { title, createdAt, creator, summary, isCompleted },
}: {
  novel: NovelSnippetType;
}) => {
  const { hasCopied, onCopy } = useClipboard(creator);

  // doing this as novel.updatedAt.toNumber() throws`.toNumber() is not a function`
  const safeCreatedAt = ethers.BigNumber.from(createdAt).toNumber();
  return (
    <>
      <VStack spacing={3} w={'100%'}>
        <VStack>
          <Heading textAlign={'center'} w={'100%'} color={'whiteAlpha.900'}>
            {title}
          </Heading>
          {isCompleted && (
            <Badge variant={'subtle'} colorScheme={'green'} px={2}>
              Completed
            </Badge>
          )}
        </VStack>
        <Text onClick={onCopy} color={'whiteAlpha.900'} _hover={{ cursor: 'pointer' }}>
          Initial Author: {hasCopied ? 'Copied' : shortenAddress(creator)}
        </Text>
        <Save ready={true}/>
        <Text color={'whiteAlpha.900'}>Start Date: {formatDate(toDate(safeCreatedAt))}</Text>
      </VStack>
      <VStack w={'100%'} spacing={3} alignItems={'flex-start'}>
        <Heading size={'md'} color={'whiteAlpha.800'}>
          Summary
        </Heading>
        <Text w="100%" fontStyle={'italic'} color={'whiteAlpha.900'}>
          {summary}
        </Text>
      </VStack>
    </>
  );
};

export default NovelDetail;
