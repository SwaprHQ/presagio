import base58 from 'bs58';

/**
 * Convert 32 bytes hex string to ipfscidv0.
 * @param hexstr - 32 Bytes long string
 * @returns IPFS CID Version 0
 */
export function byte32ToIPFSCIDV0(hexstr: string): string {
  const binaryStr = Buffer.from(hexstr, 'hex');
  const completedBinaryStr = Buffer.concat([Buffer.from([0x12, 0x20]), binaryStr]);
  return base58.encode(completedBinaryStr);
}
