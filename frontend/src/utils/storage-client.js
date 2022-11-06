import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'
  // TEMP
  const WEB3STORAGE_TOKEN = import.meta.env.VITE_WEB3_STORAGE_KEY;
  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return WEB3STORAGE_TOKEN
}

export function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}
