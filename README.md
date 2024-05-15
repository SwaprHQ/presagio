# Next dapp starter kit

This is a template meant to kickstart dapps.

![Next dapp starter kit](/public/next-dapp-starter-kit.png)

## Tech stack

- [nextjs](https://nextjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [tailwindcss](https://tailwindcss.com/)
- [viem](https://viem.sh/)
- [wagmi](https://wagmi.sh/)
- [connectkit](https://docs.family.co/connectkit)

## Getting Started

First, install packages.

```bash
bun install
```

Run the development server:

```bash
bun dev
```

## Folder structure

### Entities

Entities is where business logic lives. Instead of having that spread out on components we create classes with logic.

**Markets**

Logic associated with Omen markets like Outcome, Position and Market.

**Tokens**

Logic related to blockchain tokens like Token, Currency, NativeCurrency
