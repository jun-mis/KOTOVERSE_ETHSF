# KOTOVERSE: A Collaborative NFT Marketplace for Fiction Books

## Short Description
"KOTOVERSE" is a collaborative NFT marketplace for fiction books.
KOTOBA means words in Japanese. Shall we begin a text-based metaverse with your KOTOBA?

## Long Description
Just as Wattpad has over 4 million authors and 90 million MAUs globary, indie authors post their work online to reach readers. On the other hand, fan-works are active online as in AO3, but due to regulations, it's hard to earn money from them. While it is a pleasant fact that Web1/2 has opened the door to amateur novelists, only a handful of them are earning enough money due to its business model.
We therefore developed "KOTOVERSE," a collaborative, text-based NFT marketplace, to empower amateur novelists with the power of Web3. With KOTOVERSE, authors submit and sell their novels as NFTs, also they purchase book cover NFTs by illustrators/designers and set them up as their own book covers. In addition, fans sell their derivative works (side stories = novels) using NFT characters they own. They are notified when their favorite authors' works are published and can support them with a subscription for a fixed price.


## How It's Made
Our collaborative platform where fans, authors, and illustrators frequently purchase NFTs from each other requires fast, stress-free transactions and low gas fees. We use Polygon because it is well positioned to meet those requirements while improving our brand as a chain with a low environmental impact.
Writers prefer to remain anonymous, even using pen names, as do crypto enthusiasts. Meanwhile, it is important to prevent massive bot attacks on our platform. Proof of Personhood by Worldcoin allows writers to maintain their anonymity and privacy while protecting our platform from bot attacks.
We used IPFS to store images for NFTs to its storage. We believe that decentralized and distributed file storage provides increased security and immutability. We are pushing the assets after the NFTs are minted and in future will use Content Id to generate metadata.
Push Protocol enables us to create a communication among users and writers by adding features like adding a clap on writer’s works and subscriptions about the new stories. We created a channel and used modules provided by Push Protocol to enable these features.
Unlock protocol enables book readers to support writers/illustrators by subscribing to their works on a monthly basis.
As programming languages, Solidity was used to write the smart contracts, and the front end was implemented in React.


## Technology Stacks
- Front-End: React, Vite
- Smart Contract: Solidity (Polygon), Hardhat
- Data Storage: IPFS
- Other Tools/APIs: Worldcoin, Unlock Protocol, Push Protocol

## Why We Use Polygon
- Polygonscan Link: https://mumbai.polygonscan.com/address/0xc6B435429b3881800B5Cf20567A5aDDAe37db90B
- We're aiming a prize for best UX / best metaverse or gaming project.
- Our collaborative platform where fans, authors, and illustrators frequently purchase NFTs from each other requires fast, stress-free transactions and low gas fees. Polygon is well positioned to meet these requirements while improving our brand as a chain with a low environmental impact.

## What's Next
We would like to create community functions for writers and illustrators to interact with other creators and fans.
- Chat feature with XMTP (In Preparation)
- Visualization of the social graph between creators and fans
