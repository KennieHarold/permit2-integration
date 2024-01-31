import { ethers } from "hardhat";
import { BaseContract, Signer } from "ethers";
import { ApprovalManager, TestToken } from "../typechain-types";

// Make sure to run `forge build` for permit2
import Permit2Artifact from "../lib/permit2/out/Permit2.sol/Permit2.json";

const PERMIT_DETAILS = [
  { name: "token", type: "address" },
  { name: "amount", type: "uint160" },
  { name: "expiration", type: "uint48" },
  { name: "nonce", type: "uint48" },
];

const PERMIT_TYPES = {
  PermitSingle: [
    { name: "details", type: "PermitDetails" },
    { name: "spender", type: "address" },
    { name: "sigDeadline", type: "uint256" },
  ],
  PermitDetails: PERMIT_DETAILS,
};

function toDeadline(expiration: number): number {
  return Math.floor((Date.now() + expiration) / 1000);
}

describe("Permit2 Tests", () => {
  let [owner, user]: Signer[] = [];
  let token: TestToken;
  let approvalManager: ApprovalManager;
  let permit2: BaseContract;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("TestToken");
    token = await tokenFactory.deploy();

    const permitFactory = new ethers.ContractFactory(
      Permit2Artifact.abi,
      Permit2Artifact.bytecode,
      owner,
    );
    permit2 = await permitFactory.deploy();

    const approvalManagerFactory =
      await ethers.getContractFactory("ApprovalManager");
    approvalManager = await approvalManagerFactory.deploy(
      await permit2.getAddress(),
    );

    await token
      .connect(owner)
      .transfer(await user.getAddress(), ethers.parseEther("10000"));
  });

  it("should permit and transfer", async () => {
    const tokenAddress = await token.getAddress();
    const approvalManagerAddress = await approvalManager.getAddress();
    const permit2Address = await permit2.getAddress();

    const permitSingle = {
      details: {
        token: tokenAddress,
        amount: BigInt("0xffffffffffffffffffffffffffffffffffffffff"),
        expiration: toDeadline(1000 * 60 * 60 * 24 * 30),
        nonce: 0,
      },
      spender: approvalManagerAddress,
      sigDeadline: toDeadline(1000 * 60 * 60 * 30),
    };

    const domain = {
      name: "Permit2",
      chainId: 31337,
      verifyingContract: permit2Address,
    };

    const signature = await user.signTypedData(
      domain,
      PERMIT_TYPES,
      permitSingle,
    );

    await token
      .connect(user)
      .approve(permit2Address, ethers.parseEther("1000"));

    await approvalManager
      .connect(user)
      .permitAndTransferToMe(permitSingle, signature, ethers.parseEther("1"));
  });
});
