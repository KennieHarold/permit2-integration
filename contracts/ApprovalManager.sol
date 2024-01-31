// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IAllowanceTransfer} from "permit2/src/interfaces/IAllowanceTransfer.sol";

contract ApprovalManager is ReentrancyGuard {
    IAllowanceTransfer public immutable PERMIT2;

    constructor(IAllowanceTransfer permit2) {
        PERMIT2 = permit2;
    }

    function permitAndTransferToMe(
        IAllowanceTransfer.PermitSingle calldata permitSingle,
        bytes calldata signature,
        uint160 amount
    ) external {
        require(permitSingle.spender == address(this));

        PERMIT2.permit(msg.sender, permitSingle, signature);
        PERMIT2.transferFrom(
            msg.sender,
            address(this),
            amount,
            permitSingle.details.token
        );
    }
}