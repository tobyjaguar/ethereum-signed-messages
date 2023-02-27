import * as prompt from 'prompt';
import * as secp  from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

// private key: fc3c822e644afedf6ef028cc1c88ab7a91f866568b89ae226967140d8486c9cc
// public key: 04fefedcfbd8b17a992a8acc3fddbb2351bc3fec0c8190e430c28d3eb48fb7dafadc7682ed4da984290b48d12305c53348c6e556a74768403b19239336841a2c1f
// eth public address: 0x39a21918Ed822CC530F2C3f62B2f128755F14530
// hex signature: 304402200c9a80e5b5d54711bbd2744fd48ffe9084463a8f850fce239953d96390fc743d022024e262944c1f2bbc3bc13cf531e8e75e8085d59a4a1a1e0a02ed204b9d912ee8

async function main() {
    prompt.start();
    const{message, private_key} = await prompt.get(['message', 'private_key']);
    const hashedMsg: Uint8Array = keccak256(utf8ToBytes(message));
    const privateKeyBytes: Uint8Array = secp.utils.hexToBytes(private_key);
    const publicKey: Uint8Array = secp.getPublicKey(private_key);
    const ethAddress: string = '0x'.concat(toHex(keccak256(publicKey.slice(1)).slice(-20)));
    console.log(`signing with ethereum address: ${ethAddress}`);
    const [signedMsg, recovery] = await secp.sign(hashedMsg, privateKeyBytes, { recovered: true});
    const signedMsgHex: string = toHex(signedMsg);
    const isSigned: boolean = secp.verify(signedMsg, hashedMsg, publicKey);
    console.log(`hex signature: ${signedMsgHex}`);
    console.log(`is signature good: ${isSigned}`);
}

main();

