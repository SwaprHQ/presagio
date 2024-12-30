'use client';

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  errorToast,
  Icon,
  Input,
  successToast,
  Tag,
  VisuallyHidden,
} from '@swapr/ui';
import {
  successApprovalTxToast,
  SwapInput,
  TokenLogo,
  TxButton,
  waitingTxToast,
} from '@/app/components';
import { SDAI, WXDAI } from '@/constants';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Outcome, Token } from '@/entities';
import { useAccount, useConfig, useWriteContract } from 'wagmi';
import {
  formatDateTime,
  formatEtherWithFixedDecimals,
  formatValueWithFixedDecimals,
} from '@/utils';
import { Abi, erc20Abi, formatEther, parseEther } from 'viem';
import { getUnixTime, isPast } from 'date-fns';
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from 'wagmi/actions';
import RealityABI from '@/abi/reality.json';
import ConditionalTokensABI from '@/abi/conditionalTokens.json';
import MarketMakerFactoryABI from '@/abi/marketMakerFactory.json';
import {
  ORACLE_ADDRESS,
  REALITY_ETH_CONTRACT_ADDRESS,
  REALITY_ETH_TIMEOUT,
  SINGLE_SELECT_TEMPLATE_ID,
} from '@/hooks/contracts/realityeth';
import { KLEROS_ARBITRATOR_ADDRESS } from '@/hooks/contracts/kleros';
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  MARKET_MAKER_FACTORY_ADDRESS,
} from '@/hooks/contracts';
import { useReadBalanceOf } from '@/hooks/contracts/erc20';
import { calcDistributionHint } from '@/utils/liquidity';
import { ModalId, useModal, useTx } from '@/context';
import Link from 'next/link';

type InputOutcome = {
  name: string;
  percentage: number;
};

const defaultInputOutcomes: InputOutcome[] = [
  { name: '', percentage: 50 },
  { name: '', percentage: 50 },
];
const tokenList = [WXDAI, SDAI];

const LP_FEE = parseEther('0.02');

const getDefaultDateTime = () => {
  const now = new Date();

  // Format as 'YYYY-MM-DDTHH:mm'
  return now.toISOString().slice(0, 16);
};

export default function CreateMarketPage() {
  const { address } = useAccount();
  const { openModal, closeModal } = useModal();

  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [outcomes, setOutcomes] = useState<InputOutcome[]>(defaultInputOutcomes);
  const [closingDate, setClosingDate] = useState(getDefaultDateTime());
  const [marketToken, setMarketToken] = useState<Token>(SDAI);

  const [percentagesError, setPercentagesError] = useState<Record<number, string> | null>(
    null
  );
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: balance } = useReadBalanceOf({
    address,
    tokenAddress: marketToken.address,
  });

  useEffect(() => {
    if (!question) setError('Enter market question');
    else if (outcomes.findIndex(outcome => !outcome.name) !== -1)
      setError('Enter outcome names');
    else if (!category) setError('Enter category');
    else if (!amount || +amount === 0) setError('Enter amount');
    else if (dateTimeError) setError('Enter valid closing date');
    else if (percentagesError) setError('Enter valid outcomes');
    else setError(null);
  }, [amount, category, dateTimeError, outcomes, percentagesError, question]);

  const maxBalance = useCallback(() => {
    balance && setAmount(formatEther(balance as bigint));
  }, [balance]);

  const amountInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }, []);

  const onTokenChange = useCallback(
    (token?: Token | Outcome) => token && token instanceof Token && setMarketToken(token),
    []
  );
  const marketQuestionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  }, []);

  const categoryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }, []);

  const closingDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setClosingDate(event.target.value);
    if (isPast(event.target.value)) setDateTimeError("Closing date can't be in the past");
    else setDateTimeError(null);
  }, []);

  const percentageInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = parseInt(event.target.value);
      setOutcomes(previousOutcomes => {
        const newOutcomes = [...previousOutcomes];
        newOutcomes[index] = { ...newOutcomes[index], percentage: value };

        return newOutcomes;
      });
    },
    []
  );
  const nameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      setOutcomes(previousOutcomes => {
        const newOutcomes = [...previousOutcomes];
        newOutcomes[index] = { ...newOutcomes[index], name: event.target.value };

        return newOutcomes;
      });
    },
    []
  );
  const percentageInputBlur = useCallback(
    (index: number) => {
      const totalPercentages = outcomes.reduce(
        (acc, { percentage }) => acc + percentage,
        0
      );

      if (totalPercentages !== 100)
        setPercentagesError({ [index]: 'Sum must equal 100%' });
      else setPercentagesError(null);
    },
    [outcomes]
  );

  const hasEnoughBalance = balance && +amount <= +formatEther(balance as bigint);
  const isDisabled = Boolean(error) || !hasEnoughBalance;

  const getButtonLabel = () => {
    if (Boolean(error)) return error;
    if (!hasEnoughBalance) return `Insufficient ${marketToken.symbol} balance`;

    return 'Create market';
  };

  const buttonLabel = getButtonLabel();

  const onCreationConclusion = () => {
    setQuestion('');
    setCategory('');
    setAmount('');
    setOutcomes(defaultInputOutcomes);
    setClosingDate(getDefaultDateTime());
    setMarketToken(SDAI);
    closeModal(ModalId.CONFIRM_MARKET_CREATION);
  };

  return (
    <main className="mt-12 flex w-full flex-col items-center px-6">
      <div className="w-full">
        <div className="mx-auto max-w-[464px] space-y-4">
          <div className="w-full rounded-16 border border-outline-base-em bg-surface-surface-0">
            <div className="space-y-4 p-5">
              <Input
                id="question"
                label="Market question"
                placeholder="e.g. Will BTC hit 500k until end of this year?"
                className="[&_label]:text-base"
                onChange={marketQuestionChange}
                value={question}
              />
              <div className="space-y-1">
                <p className="text-text-med-em">Outcomes</p>
                <div className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <OutcomeInput
                      key={index}
                      outcome={outcome}
                      index={index}
                      error={percentagesError && percentagesError[index]}
                      onPercentageChange={percentageInputChange}
                      onNameChange={nameInputChange}
                      onBlur={percentageInputBlur}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <Input
                  id="category"
                  label="Category"
                  placeholder="Politics"
                  className="[&_label]:text-base"
                  onChange={categoryChange}
                  value={category}
                />
                <Input
                  id="closing-date"
                  label="Closing date"
                  type="datetime-local"
                  className="[&_label]:text-base"
                  onChange={closingDateChange}
                  value={closingDate}
                  message={dateTimeError && dateTimeError}
                />
              </div>
              <div className="space-y-1">
                <p className="text-text-med-em">Fund Market</p>
                <SwapInput
                  title="You add"
                  selectedToken={marketToken}
                  tokenList={tokenList}
                  onTokenClick={onTokenChange}
                  id="fund-amount"
                  onChange={amountInputChange}
                  value={amount}
                >
                  <div className="flex min-h-8 items-center justify-end space-x-1.5 text-sm">
                    <p className="text-text-low-em">
                      Balance:{' '}
                      {balance ? formatEtherWithFixedDecimals(balance as bigint) : 0}
                    </p>
                    {!!balance && (
                      <Button
                        variant="ghost"
                        className="text-sm font-semibold text-text-primary-main"
                        onClick={maxBalance}
                      >
                        Use MAX
                      </Button>
                    )}
                  </div>
                </SwapInput>
                <div className="px-3 py-1">
                  <div className="flex items-center justify-between">
                    <p className="text-text-low-em">LP fees</p>
                    <div className="flex items-center space-x-2">
                      <p>2%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-text-low-em">Oracle</p>
                    <div className="flex items-center space-x-2">
                      <p>reality.eth</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-text-low-em">Arbitrator</p>
                    <div className="flex items-center space-x-2">
                      <p>Kleros</p>
                    </div>
                  </div>
                </div>
              </div>
              <TxButton
                disabled={isDisabled}
                onClick={() => openModal(ModalId.CONFIRM_MARKET_CREATION)}
              >
                {buttonLabel}
              </TxButton>
            </div>
          </div>
        </div>
      </div>
      <ConfirmCreation
        question={question}
        amount={amount}
        closingDate={closingDate}
        token={marketToken}
        outcomes={outcomes}
        category={category}
        onConclude={onCreationConclusion}
      />
    </main>
  );
}

const STEPS = {
  ASK_QUESTION: 'ask-question',
  PREPARE_CONDITION: 'prepare-condition',
  ALLOW_TOKEN: 'allow-token',
  CREATE_MARKET: 'create-market',
};

const ConfirmCreation = ({
  question,
  amount,
  closingDate,
  token,
  outcomes,
  category,
  onConclude,
}: {
  category: string;
  question: string;
  amount: string;
  closingDate: string;
  token: Token;
  outcomes: InputOutcome[];
  onConclude: () => void;
}) => {
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const closingDateObject = getUnixTime(closingDate);

  const { isModalOpen, closeModal } = useModal();
  const [step, setStep] = useState<string>(STEPS.ASK_QUESTION);
  const [isCreating, setIsCreating] = useState(false);
  const { submitTx } = useTx();

  const txErrorHandling = (e: Error) => {
    const error = e as WriteContractErrorType | WaitForTransactionReceiptErrorType;
    const errorMessage =
      error.cause?.toString().split('\n').at(0) ||
      'Something went wrong with the transaction.';

    errorToast({
      children: <div className="font-normal">{errorMessage}</div>,
    });
  };

  const createMarket = async () => {
    try {
      setIsCreating(true);
      const questionId = await askQuestion();
      setStep(STEPS.PREPARE_CONDITION);
      const conditionId = await prepareCondition(questionId);
      setStep(STEPS.ALLOW_TOKEN);
      await approveToken();
      setStep(STEPS.CREATE_MARKET);
      await deployMarket(conditionId);
    } catch (error) {
      console.log(error);
      setStep(STEPS.ASK_QUESTION);
    } finally {
      setIsCreating(false);
      onConclude();
    }
  };

  const askQuestion = async (): Promise<string> => {
    const questionText = formatRealityQuestion(
      question,
      outcomes.map(({ name }) => name),
      category
    );

    const openingTime = getUnixTime(closingDate);

    const writeContractParams: any = {
      abi: RealityABI,
      address: REALITY_ETH_CONTRACT_ADDRESS,
      functionName: 'askQuestion',
      args: [
        SINGLE_SELECT_TEMPLATE_ID,
        questionText,
        KLEROS_ARBITRATOR_ADDRESS,
        REALITY_ETH_TIMEOUT,
        openingTime,
        0,
      ],
    };

    const { result: simulatedQuestionId } = await simulateContract(
      config,
      writeContractParams
    ).catch(error => {
      errorToast({
        children: <div className="font-normal">Question already exists.</div>,
      });
      throw error;
    });

    await writeContractAsync(writeContractParams)
      .then(async txHash => {
        waitingTxToast(txHash);

        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
      })
      .catch(error => {
        txErrorHandling(error);
        throw error;
      });

    return simulatedQuestionId;
  };

  const prepareCondition = async (questionId: string): Promise<string> => {
    const conditionId = (await readContract(config, {
      abi: ConditionalTokensABI,
      address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
      functionName: 'getConditionId',
      args: [ORACLE_ADDRESS, questionId, BigInt(outcomes.length)],
    })) as string;

    const outcomeSlotsCounts = await readContract(config, {
      abi: ConditionalTokensABI,
      address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
      functionName: 'getOutcomeSlotCount',
      args: [conditionId],
    });

    const conditionExists = outcomeSlotsCounts !== BigInt(0);
    if (conditionExists) return conditionId;

    await writeContractAsync({
      abi: ConditionalTokensABI,
      address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
      functionName: 'prepareCondition',
      args: [ORACLE_ADDRESS, questionId, BigInt(outcomes.length)],
    })
      .then(async txHash => {
        waitingTxToast(txHash);
        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
      })
      .catch(error => {
        txErrorHandling(error);
        throw error;
      });

    return conditionId;
  };

  const approveToken = async () => {
    const initialFunds = parseEther(amount);

    await writeContractAsync({
      abi: erc20Abi,
      address: token.address,
      functionName: 'approve',
      args: [MARKET_MAKER_FACTORY_ADDRESS, initialFunds],
    })
      .then(async txHash => {
        waitingTxToast(txHash);
        await waitForTransactionReceipt(config, {
          hash: txHash,
        });

        successApprovalTxToast(txHash, token);
      })
      .catch(error => {
        txErrorHandling(error);
        throw error;
      });
  };

  const deployMarket = async (conditionId: string) => {
    const saltNonce = BigInt(Math.round(Math.random() * 1000000));
    const initialFunds = parseEther(amount);
    const distributionHint = calcDistributionHint(
      outcomes.map(({ percentage }) => percentage)
    );

    const writeContractParams: any = {
      abi: MarketMakerFactoryABI as Abi,
      address: MARKET_MAKER_FACTORY_ADDRESS,
      functionName: 'create2FixedProductMarketMaker',
      args: [
        saltNonce,
        CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        token.address,
        [conditionId],
        LP_FEE,
        initialFunds,
        distributionHint,
      ],
    };

    const { result: simulatedMarketAddress } = await simulateContract(
      config,
      writeContractParams
    ).catch(error => {
      console.error(error);
      return { result: '' };
    });

    await submitTx(writeContractParams);

    if (Boolean(simulatedMarketAddress))
      successToast({
        children: (
          <p>
            Your market was created succefully.{' '}
            <Link
              href={`/markets?id=${simulatedMarketAddress}`}
              target="_blank"
              className="inline-block underline"
            >
              View market
            </Link>
          </p>
        ),
      });
  };

  const stepButtonText = {
    [STEPS.ASK_QUESTION]: 'Creating question',
    [STEPS.PREPARE_CONDITION]: 'Creating condition',
    [STEPS.ALLOW_TOKEN]: 'Approving token',
    [STEPS.CREATE_MARKET]: 'Creating market',
  };

  const closeMarketCreationModal = () => {
    setIsCreating(false);
    closeModal(ModalId.CONFIRM_MARKET_CREATION);
  };

  return (
    <Dialog
      open={isModalOpen(ModalId.CONFIRM_MARKET_CREATION)}
      onOpenChange={closeMarketCreationModal}
    >
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogClose position="left">
            <Icon name="arrow-left" />
          </DialogClose>
          <DialogTitle>Create Market</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div>
            <p className="text-text-med-em">Your market preview</p>
            <div className="relative mx-1 my-2 rounded-16 bg-surface-surface-1">
              <div className="rounded-12 bg-surface-surface-1 outline outline-outline-low-em">
                <div className="flex h-[160px] flex-col justify-between p-4">
                  <div className="flex flex-row justify-between">
                    <div className="flex space-x-4">{question}</div>
                    <Tag colorScheme="quaternary">{category}</Tag>
                  </div>
                  <div className="w-full space-y-1">
                    <div className="flex space-x-1 transition-all">
                      <div
                        className="flex h-3 items-center rounded-s-8 bg-surface-success-accent-2 px-2"
                        style={{
                          width: `${outcomes[0].percentage}%`,
                        }}
                      />

                      <div
                        className="flex h-3 items-center rounded-e-8 bg-surface-danger-accent-2 px-2"
                        style={{
                          width: `${outcomes[1].percentage}%`,
                        }}
                      />
                    </div>

                    <div className="flex h-4 justify-between text-sm font-semibold">
                      <p className="w-full uppercase text-text-success-main">{`${outcomes[0].name} ${outcomes[0].percentage}%`}</p>
                      <p className="w-full text-right uppercase text-text-danger-main">
                        {`${outcomes[1].name} ${outcomes[1].percentage}%`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex h-[40px] items-center border-t border-outline-base-em px-4">
                  <div className="flex w-full items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <TokenLogo address={token.address} size="xs" className="size-3.5" />
                      <p className="text-sm font-semibold text-text-med-em">
                        {formatValueWithFixedDecimals(amount)} <span>Liquidity</span>
                      </p>
                    </div>
                    <p className="text-sm text-text-low-em">
                      Closes at {formatDateTime(closingDateObject, 'HH:mm - d MMM yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-16 bg-surface-surface-1 px-4 py-2">
            <div className="flex items-center justify-between">
              <p className="text-text-low-em">LP fees</p>
              <div className="flex items-center space-x-2">
                <p>2%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-low-em">Oracle</p>
              <div className="flex items-center space-x-2">
                <p>reality.eth</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-low-em">Arbitrator</p>
              <div className="flex items-center space-x-2">
                <p>Kleros</p>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            width="full"
            colorScheme="success"
            variant="pastel"
            onClick={createMarket}
            size="lg"
            disabled={isCreating}
          >
            {isCreating ? stepButtonText[step] : 'Create Market'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const OutcomeInput = ({
  index,
  outcome,
  error,
  onNameChange,
  onPercentageChange,
  onBlur,
}: {
  index: number;
  outcome: InputOutcome;
  error: string | null;
  onPercentageChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  onNameChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  onBlur: (index: number) => void;
}) => {
  const onPercentageInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onPercentageChange(event, index),
    [index, onPercentageChange]
  );
  const onNameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onNameChange(event, index),
    [index, onNameChange]
  );

  const onInputBlur = useCallback(() => onBlur(index), [index, onBlur]);

  return (
    <div className="flex space-x-2" key={index}>
      <Input
        placeholder={index === 0 ? 'Yes' : 'No'}
        className="w-11/12"
        onChange={onNameInputChange}
        value={outcome.name}
      />
      <Input
        placeholder="50%"
        value={outcome.percentage}
        onChange={onPercentageInputChange}
        onBlur={onInputBlur}
        message={error && error}
        type="number"
      />
    </div>
  );
};

/**
 * Format the market info into reality.eth question text
 * Current parsing is for template id = 2 only
 * @see https://realitio.github.io/docs/html/contracts.html#templates
 */

function formatRealityQuestion(
  question: string,
  outcomes: string[],
  category: string,
  language = 'en'
): string {
  // Escape characters for JSON troubles on Reality.eth.
  question = question.replace(/"/g, '\\"');

  return [
    question,
    outcomes.map(outcome => `"${outcome}"`).join(','),
    category,
    language,
  ].join('␟');
}
