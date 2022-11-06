import { useUnlock } from '../../hooks/useUnlock';
import { Button } from '@chakra-ui/react';

export default function Save({ zipcode, ready}) {

  const { checkout, authenticate, isAuthorized, user } = useUnlock({
    title: "Kotoverse",
    locks: {
      '0xa8094f76682f4d0648b56aaea9667041e7f47dbe': {
        network: 5
      }
    }
  })

  if (!ready) {
    return null
  }

  if (!user) {
    return <Button
        borderRadius={'20px'}
        bgColor={'#bd3fc1'}
        color={'whiteAlpha.700'}
        _hover={{ bgColor: '#171334' }}
        onClick={authenticate}
      >
      Subscribe
    </Button>
  }

  console.log({ isAuthorized })

  if (!isAuthorized) {
    return (<button onClick={() => checkout()} className="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
      Purchase Premium!
    </button>)
  }
}