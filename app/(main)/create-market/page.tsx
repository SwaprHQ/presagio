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
  Icon,
  Input,
  Tag,
  VisuallyHidden,
} from '@swapr/ui';
import { ConnectButton, SwapInput, TokenLogo, TxButton } from '../../components';
import { SDAI, WXDAI } from '@/constants';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Outcome, Token } from '@/entities';
import { useReadBalanceOf } from '@/hooks/contracts/erc20';
import { useAccount, useConfig, useWriteContract } from 'wagmi';
import {
  formatDateTime,
  formatEtherWithFixedDecimals,
  formatValueWithFixedDecimals,
} from '@/utils';
import { erc20Abi, formatEther, parseEther } from 'viem';
import { getUnixTime, isPast } from 'date-fns';
import { useUnsupportedNetwork } from '@/hooks';
import { readContract, simulateContract, waitForTransactionReceipt } from 'wagmi/actions';
import {
  ORACLE_ADDRESS,
  REALITY_ETH_CONTRACT_ADDRESS,
  REALITY_ETH_TIMEOUT,
  SINGLE_SELECT_TEMPLATE_ID,
} from '../../../hooks/contracts/realityeth';
import { KLEROS_ARBITRATOR_ADDRESS } from '../../../hooks/contracts/kelros';
import RealityABI from '@/abi/reality.json';
import ConditionalTokensABI from '@/abi/conditionalTokens.json';
import MarketMakerFactoryABI from '@/abi/marketMakerFactory.json';
import {
  CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
  MARKET_MAKER_FACTORY_ADDRESS,
} from '../../../hooks/contracts';
import { calcDistributionHint } from '../../../utils/liquidity';
import { ModalId, useModal } from '../../../context';

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
  const { address, isDisconnected } = useAccount();
  const { openModal } = useModal();

  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [outcomes, setOutcomes] = useState<InputOutcome[]>(defaultInputOutcomes);
  const [closingDate, setClosingDate] = useState(getDefaultDateTime());
  const [marketToken, setMarketToken] = useState<Token>(SDAI);
  const unsupportedNetwork = useUnsupportedNetwork();

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
    if (!question) setError('Enter market quesiton');
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
}: {
  category: string;
  question: string;
  amount: string;
  closingDate: string;
  token: Token;
  outcomes: InputOutcome[];
}) => {
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const closingDateObject = getUnixTime(closingDate);

  const { isModalOpen, closeModal } = useModal();
  const [step, setStep] = useState<string>(STEPS.ASK_QUESTION);
  const [isCreating, setIsCreating] = useState(false);

  const createMarket = async () => {
    setIsCreating(true);
    const questionId = await askQuestion();
    if (!questionId) return;
    setStep(STEPS.PREPARE_CONDITION);
    const conditionId = await prepareCondition(questionId);
    if (!conditionId) return;
    setStep(STEPS.ALLOW_TOKEN);
    await approveToken();
    setStep(STEPS.CREATE_MARKET);
    await deployMarket(conditionId);
    setIsCreating(false);
  };

  const askQuestion = async (): Promise<string | null> => {
    const questionText = formatRealitioQuestion(
      question,
      outcomes.map(({ name }) => name),
      category
    );

    // When the question is open to answer
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

    try {
      const { result: questionId } = await simulateContract(config, writeContractParams);

      await writeContractAsync(writeContractParams)
        .then(async txHash => {
          console.log(txHash);
          await waitForTransactionReceipt(config, {
            hash: txHash,
          });
        }) // .catch(approveTxErrorHandling)
        // .finally(() => setIsApproving(false));
        .catch(e => {
          console.error(e);
          throw e;
        });
      console.log('questionId', questionId);

      return questionId;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const prepareCondition = async (questionId: string): Promise<string | null> => {
    try {
      const conditionId = await readContract(config, {
        abi: ConditionalTokensABI,
        address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        functionName: 'getConditionId',
        args: [ORACLE_ADDRESS, questionId, BigInt(outcomes.length)],
      });

      // use subgraph instead
      const outcomeSlotsCounts = await readContract(config, {
        abi: ConditionalTokensABI,
        address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        functionName: 'getOutcomeSlotCount',
        args: [conditionId],
      });

      const conditionExists = outcomeSlotsCounts !== BigInt(0);
      console.log('conditionExists', conditionExists);

      await writeContractAsync({
        abi: ConditionalTokensABI,
        address: CONDITIONAL_TOKEN_CONTRACT_ADDRESS,
        functionName: 'prepareCondition',
        args: [ORACLE_ADDRESS, questionId, BigInt(outcomes.length)],
      })
        .then(async txHash => {
          console.log(txHash);
          await waitForTransactionReceipt(config, {
            hash: txHash,
          });
        }) // .catch(approveTxErrorHandling)
        // .finally(() => setIsApproving(false));
        .catch(e => {
          console.error(e);

          // need to catch it
          throw e;
        });
      return conditionId as string;
    } catch (e) {
      return null;
    }
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
        console.log(txHash);
        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
      }) // .catch(approveTxErrorHandling)
      // .finally(() => setIsApproving(false));
      .catch(e => {
        console.error(e);
      });
  };

  const deployMarket = async (conditionId: string) => {
    const saltNonce = BigInt(Math.round(Math.random() * 1000000));
    const initialFunds = parseEther(amount);
    const distributionHint = calcDistributionHint(
      outcomes.map(({ percentage }) => percentage)
    );

    await writeContractAsync({
      abi: MarketMakerFactoryABI,
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
    })
      .then(async txHash => {
        console.log(txHash);
        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
      }) // .catch(approveTxErrorHandling)
      // .finally(() => setIsApproving(false));
      .catch(e => {
        console.error(e);
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
      />
    </div>
  );
};

/**
 * @see https://realitio.github.io/docs/html/contracts.html#templates
 */

function formatRealitioQuestion(
  question: string,
  outcomes: string[],
  category: string,
  language = 'en'
): string {
  /** Current parsing is for template id = 2 only */

  // Escape characters for JSON troubles on Reality.eth.
  question = question.replace(/"/g, '\\"');

  return [
    question,
    outcomes.map(outcome => `"${outcome}"`).join(','),
    category,
    language,
  ].join('␟');
}
