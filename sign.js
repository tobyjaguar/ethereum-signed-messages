"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var prompt = require("prompt");
var secp = require("ethereum-cryptography/secp256k1");
var keccak_1 = require("ethereum-cryptography/keccak");
var utils_1 = require("ethereum-cryptography/utils");
// private key: fc3c822e644afedf6ef028cc1c88ab7a91f866568b89ae226967140d8486c9cc
// public key: 04fefedcfbd8b17a992a8acc3fddbb2351bc3fec0c8190e430c28d3eb48fb7dafadc7682ed4da984290b48d12305c53348c6e556a74768403b19239336841a2c1f
// eth public address: 0x39a21918Ed822CC530F2C3f62B2f128755F14530
// hex signature: 304402200c9a80e5b5d54711bbd2744fd48ffe9084463a8f850fce239953d96390fc743d022024e262944c1f2bbc3bc13cf531e8e75e8085d59a4a1a1e0a02ed204b9d912ee8
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, message, private_key, hashedMsg, privateKeyBytes, publicKey, ethAddress, _b, signedMsg, recovery, signedMsgHex, isSigned;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    prompt.start();
                    return [4 /*yield*/, prompt.get(['message', 'private_key'])];
                case 1:
                    _a = _c.sent(), message = _a.message, private_key = _a.private_key;
                    hashedMsg = (0, keccak_1.keccak256)((0, utils_1.utf8ToBytes)(message));
                    privateKeyBytes = secp.utils.hexToBytes(private_key);
                    publicKey = secp.getPublicKey(private_key);
                    ethAddress = '0x'.concat((0, utils_1.toHex)((0, keccak_1.keccak256)(publicKey.slice(1)).slice(-20)));
                    console.log("signing with ethereum address: ".concat(ethAddress));
                    return [4 /*yield*/, secp.sign(hashedMsg, privateKeyBytes, { recovered: true })];
                case 2:
                    _b = _c.sent(), signedMsg = _b[0], recovery = _b[1];
                    signedMsgHex = (0, utils_1.toHex)(signedMsg);
                    isSigned = secp.verify(signedMsg, hashedMsg, publicKey);
                    console.log("hex signature: ".concat(signedMsgHex));
                    console.log("is signature good: ".concat(isSigned));
                    return [2 /*return*/];
            }
        });
    });
}
main();
