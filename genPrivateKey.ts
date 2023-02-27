import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import * as ethers from 'ethers';

function main() {
    let privKey: Uint8Array = secp.utils.randomPrivateKey();
    let publicKey: Uint8Array = secp.getPublicKey(privKey);
    let ethAddy: string = '0x'.concat(toHex(keccak256(publicKey.slice(1)).slice(-20)));
    let ethersAddy = ethers.utils.computeAddress(publicKey);
    
    if (ethers.utils.isAddress(ethAddy)) {
        if (ethers.utils.getAddress(ethAddy) === ethersAddy) {
            console.log(`calculated the following secp256k1 key: `);
            console.log(`private key: ${toHex(privKey)}`);
            console.log(`public key: ${toHex(publicKey)}`);
            console.log(`eth public address: ${ethersAddy}`);
        }
    }
    else {
        console.log(`failed to compute address from private key derivation`);
    }
}

main();