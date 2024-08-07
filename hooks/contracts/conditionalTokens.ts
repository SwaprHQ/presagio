import { UseReadContractParameters, useReadContract } from 'wagmi';
import ConditionalTokensABI from '@/abi/conditionalTokens.json';
import { Abi, Address, zeroHash } from 'viem';
import { writeContract } from 'wagmi/actions';
import { config } from '@/providers/config';
import { WXDAI } from '@/constants';
import { gnosis } from 'viem/chains';

export const CONDITIONAL_TOKEN_CONTRACT_ADDRESS =
  '0xCeAfDD6bc0bEF976fdCd1112955828E00543c0Ce';

export const useReadConditionalTokensContract = <T>({
  functionName,
  args,
  query,
}: UseReadContractParameters) => {
  return useReadContract({
    abi: ConditionalTokensABI as Abi,
    address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
    functionName,
    args,
    query,
    chainId: gnosis.id,
  });
};

export const useReadBalanceOf = (owner: Address | undefined, positionId: number) => {
  return useReadConditionalTokensContract({
    functionName: 'balanceOf',
    args: [owner, positionId],
    query: { enabled: !!owner },
  });
};

export const useReadGetPositionId = (colleteralToken: Address, collectionId: string) => {
  return useReadConditionalTokensContract({
    functionName: 'getPositionId',
    args: [colleteralToken, collectionId],
    query: { enabled: !!collectionId },
  });
};

export const useReadGetCollectionId = (
  conditionId: string | undefined,
  indexSet: number
) => {
  return useReadConditionalTokensContract({
    functionName: 'getCollectionId',
    args: [zeroHash, conditionId, indexSet],
    query: { enabled: !!conditionId },
  });
};

export const useReadBalance = (
  owner: Address | undefined,
  colleteralToken: Address,
  conditionId: string | undefined,
  indexSet: number
) => {
  const { data: collectionId } = useReadGetCollectionId(conditionId, indexSet);
  const { data: positionId } = useReadGetPositionId(
    colleteralToken as Address,
    collectionId as string
  );

  return useReadBalanceOf(owner, positionId as number);
};

interface RedeemPositionsArgs {
  collateralToken?: string;
  parentCollectionId?: string;
  conditionId: string;
  outcomeIndex: number;
}

export const redeemPositions = async ({
  collateralToken = WXDAI.address,
  parentCollectionId = zeroHash,
  conditionId,
  outcomeIndex,
}: RedeemPositionsArgs) => {
  return await writeContract(config, {
    abi: ConditionalTokensABI,
    address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
    functionName: 'redeemPositions',
    args: [collateralToken, parentCollectionId, conditionId, [outcomeIndex]],
  });
};
