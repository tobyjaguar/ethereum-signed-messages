"use strict";
exports.__esModule = true;
var secp = require("ethereum-cryptography/secp256k1");
var utils_1 = require("ethereum-cryptography/utils");
var keccak_1 = require("ethereum-cryptography/keccak");
var ethers = require("ethers");
function main() {
    var privKey = secp.utils.randomPrivateKey();
    var publicKey = secp.getPublicKey(privKey);
    var ethAddy = '0x'.concat((0, utils_1.toHex)((0, keccak_1.keccak256)(publicKey.slice(1)).slice(-20)));
    var ethersAddy = ethers.utils.computeAddress(publicKey);
    if (ethers.utils.isAddress(ethAddy)) {
        if (ethers.utils.getAddress(ethAddy) === ethersAddy) {
            console.log("calculated the following secp256k1 key: ");
            console.log("private key: ".concat((0, utils_1.toHex)(privKey)));
            console.log("public key: ".concat((0, utils_1.toHex)(publicKey)));
            console.log("eth public address: ".concat(ethersAddy));
        }
    }
    else {
        console.log("failed to compute address from private key derivation");
    }
}
main();
