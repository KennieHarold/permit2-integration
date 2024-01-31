# Basic Permit2 Integration using Hardhat

This project demonstrates basic integration of Permit2 using Hardhat

## Setup

#### 1. Make sure you have [foundry](https://github.com/foundry-rs/foundry) installed in your system, if not you can follow this guide. [Get Foundry](https://getfoundry.sh/)

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

[How to integrate Permit2](https://blog.uniswap.org/permit2-integration-guide) <br />
[Permit2 repository](https://github.com/Uniswap/permit2)