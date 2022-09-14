export class Contract{
  wallet;

  constructor({wallet}){
    this.wallet = wallet;
  }

  async createAirdrop(airdropName, metadata, totalSupply, airdropAdmin, airdropAccountData) {
    return await this.wallet.callMethod(
      {
        method: 'create_airdrop', 
        args:{
          airdrop_name: airdropName,
          metada: metadata,
          total_supply: totalSupply,
          airdrop_admin: airdropAdmin,
          airdrop_account_data: airdropAccountData
        }
      });
  }

  async createMerkleTree(leaves) {
    return await this.wallet.callMethod({method: 'create_merkle_tree', args:{leaves: leaves}})
  }

  async claim(expectedProof, claimAddress) {
    return await this.wallet.callMethod({method: 'claim', args:{expected_proof: expectedProof, leaf: claimAddress}})
  }
}