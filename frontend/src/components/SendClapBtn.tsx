import { Button } from "@chakra-ui/react";
import * as PushAPI from "@pushprotocol/restapi";
import { useWeb3React } from "@web3-react/core";

type SendBtnProps = {
  channelId: string,
  recipientId: string
}

const SendClapBtn = ({ channelId, recipientId }: SendBtnProps) => {
  const { account, library, chainId } = useWeb3React();
  const signer = library.getSigner(account);
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const recipient = 'eip155:80001:' + recipientId;
  const channel = 'eip155:42:' + channelId;

  const sendNotification = async () => {
    const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 3, // target
    identityType: 2, // direct payload
    notification: {
      title: `[SDK-TEST] notification TITLE:`,
      body: `[sdk-test] notification BODY`
    },
    payload: {
      title: `[sdk-test] payload title`,
      body: `sample msg body`,
      cta: '',
      img: ''
    },
    recipients: recipientId, // recipient address
    channel: import.meta.env.VITE_PUSH_CHANNEL_ID, // your channel address
    env: 'staging'
  });
  // TEMP
  console.log(apiResponse);
  }

  return (
    <Button onClick={sendNotification}>
      Send a 👏
    </Button>
  )
}

export default SendClapBtn;
