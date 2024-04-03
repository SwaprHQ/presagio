import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.thegraph.com/subgraphs/name/protofire/omen-xdai",
  generates: {
    "models/omen/subgraph.ts": {
      plugins: ["typescript", "typescript-graphql-request"],
    },
  },
};

export default config;
