# permit2-integration

This project demonstrates basic integration of Permit2 using Hardhat

## About Permit2
[Permit2](https://github.com/Uniswap/permit2) is a token approval contract that can safely share and manage token approvals across different smart contracts. As more projects integrate with Permit2, we can standardize token approvals across all applications. In turn, Permit2 will improve the user experience by reducing transaction costs while improving smart contract security.

## Setup

#### 1. Install [foundry](https://github.com/foundry-rs/foundry) 
Make sure foundry is installed on your system, if not you can follow this guide. [Get Foundry](https://getfoundry.sh/)

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Install Forge

```bash
# Run
npx hardhat init-foundry

# or setup manually
git submodule add https://github.com/foundry-rs/forge-std lib/forge-std
cd lib/forge-std
forge install
```

#### 3. Install and build Permit2

```bash
git submodule add https://github.com/Uniswap/permit2 lib/permit2
cd lib/permit2
forge install
forge build
```

## Testing

```bash
npm run test # or
yarn test
```
## Resources

[How to integrate Permit2](https://blog.uniswap.org/permit2-integration-guide) <br /><br />
[Permit2 repository](https://github.com/Uniswap/permit2) <br /><br />
[Permit2 and universal router](https://blog.uniswap.org/permit2-and-universal-router) <br /><br />
[Permit2 Documentation](https://docs.uniswap.org/contracts/permit2/overview)