import { CONDITIONAL_TOKENS_SUBGRAPH_URL, OMEN_SUBGRAPH_URL } from '@/constants';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'queries/omen/types.ts': {
      schema: OMEN_SUBGRAPH_URL,
      plugins: ['typescript', 'typescript-graphql-request'],
    },
    'queries/conditional-tokens/types.ts': {
      schema: CONDITIONAL_TOKENS_SUBGRAPH_URL,
      plugins: ['typescript', 'typescript-graphql-request'],
    },
  },
};

export default config;
