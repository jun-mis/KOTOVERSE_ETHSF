/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MarketPlaceInterface extends ethers.utils.Interface {
  functions: {
    "buyItem(uint256)": FunctionFragment;
    "cancelItem(uint256)": FunctionFragment;
    "feeAccount()": FunctionFragment;
    "feePercentage()": FunctionFragment;
    "itemCount()": FunctionFragment;
    "items(uint256)": FunctionFragment;
    "listItem(uint256,uint256)": FunctionFragment;
    "tokenIdToItemId(uint256)": FunctionFragment;
    "updateItem(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "buyItem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelItem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "itemCount", values?: undefined): string;
  encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "listItem",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenIdToItemId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateItem",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "buyItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancelItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeAccount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "itemCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenIdToItemId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updateItem", data: BytesLike): Result;

  events: {
    "ItemCanceled(uint256,uint256)": EventFragment;
    "ItemListed(uint256,uint256,uint256,address)": EventFragment;
    "ItemSold(uint256,uint256,address)": EventFragment;
    "ItemUpdated(uint256,uint256,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ItemCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemListed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemUpdated"): EventFragment;
}

export type ItemCanceledEvent = TypedEvent<
  [BigNumber, BigNumber] & { itemId: BigNumber; tokenId: BigNumber }
>;

export type ItemListedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string] & {
    itemId: BigNumber;
    tokenId: BigNumber;
    price: BigNumber;
    seller: string;
  }
>;

export type ItemSoldEvent = TypedEvent<
  [BigNumber, BigNumber, string] & {
    itemId: BigNumber;
    tokenId: BigNumber;
    buyer: string;
  }
>;

export type ItemUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string] & {
    itemId: BigNumber;
    tokenId: BigNumber;
    price: BigNumber;
    seller: string;
  }
>;

export class MarketPlace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketPlaceInterface;

  functions: {
    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelItem(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeAccount(overrides?: CallOverrides): Promise<[string]>;

    feePercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    itemCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, boolean] & {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
        isSold: boolean;
      }
    >;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenIdToItemId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    updateItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  buyItem(
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelItem(
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeAccount(overrides?: CallOverrides): Promise<string>;

  feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

  itemCount(overrides?: CallOverrides): Promise<BigNumber>;

  items(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string, boolean] & {
      itemId: BigNumber;
      tokenId: BigNumber;
      price: BigNumber;
      seller: string;
      isSold: boolean;
    }
  >;

  listItem(
    _tokenId: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenIdToItemId(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  updateItem(
    _tokenId: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buyItem(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    cancelItem(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    feeAccount(overrides?: CallOverrides): Promise<string>;

    feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    itemCount(overrides?: CallOverrides): Promise<BigNumber>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, boolean] & {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
        isSold: boolean;
      }
    >;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenIdToItemId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ItemCanceled(uint256,uint256)"(
      itemId?: BigNumberish | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { itemId: BigNumber; tokenId: BigNumber }
    >;

    ItemCanceled(
      itemId?: BigNumberish | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { itemId: BigNumber; tokenId: BigNumber }
    >;

    "ItemListed(uint256,uint256,uint256,address)"(
      itemId?: BigNumberish | null,
      tokenId?: null,
      price?: null,
      seller?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, string],
      {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
      }
    >;

    ItemListed(
      itemId?: BigNumberish | null,
      tokenId?: null,
      price?: null,
      seller?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, string],
      {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
      }
    >;

    "ItemSold(uint256,uint256,address)"(
      itemId?: BigNumberish | null,
      tokenId?: null,
      buyer?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string],
      { itemId: BigNumber; tokenId: BigNumber; buyer: string }
    >;

    ItemSold(
      itemId?: BigNumberish | null,
      tokenId?: null,
      buyer?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string],
      { itemId: BigNumber; tokenId: BigNumber; buyer: string }
    >;

    "ItemUpdated(uint256,uint256,uint256,address)"(
      itemId?: BigNumberish | null,
      tokenId?: null,
      price?: null,
      seller?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, string],
      {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
      }
    >;

    ItemUpdated(
      itemId?: BigNumberish | null,
      tokenId?: null,
      price?: null,
      seller?: string | null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, string],
      {
        itemId: BigNumber;
        tokenId: BigNumber;
        price: BigNumber;
        seller: string;
      }
    >;
  };

  estimateGas: {
    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelItem(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeAccount(overrides?: CallOverrides): Promise<BigNumber>;

    feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    itemCount(overrides?: CallOverrides): Promise<BigNumber>;

    items(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenIdToItemId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelItem(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feePercentage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    itemCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenIdToItemId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
