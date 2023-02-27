import * as prompt from 'prompt';
import * as ethers from 'ethers';
import * as secp  from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

async function main() {
    prompt.start();
    const{message, signed_message, eth_address} = await prompt.get(['message', 'signed_message', 'eth_address']);
    if (ethers.utils.isAddress(eth_address)) {
        const hashedMsg: Uint8Array = keccak256(utf8ToBytes(message));
        const recoveredAddress = secp.recoverPublicKey(hashedMsg, signed_message, 1);
        let ethersAddy = ethers.utils.computeAddress(recoveredAddress);
        console.log(`recovered address: ${ethersAddy}`);
        console.log(`message signed by address: ${ethersAddy === ethers.utils.getAddress(eth_address)}`);
    }   
    else {
        console.log(`the ethereum address enetered is not a valid address`);
    }
}

main();