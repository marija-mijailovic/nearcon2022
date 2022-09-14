use rs_merkle::Hasher;
use rs_merkle::{MerkleTree, algorithms::Sha256, MerkleProof, utils};
use near_sdk::{log, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize)]
pub struct MerkleData {
    leaves: Vec<String>,
    leaves_hashed: Vec<[u8;32]>,
    merkle_root: [u8;32],
    merkle_root_hash: String
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    account: String,
    merkle_data: MerkleData 
}

// Define the default, which automatically initializes the contract
impl Default for Contract{
    fn default() -> Self{
        Self{
            account: "".to_string(),
            merkle_data: MerkleData { leaves: Vec::new(), leaves_hashed: Vec::new(), merkle_root: [0; 32], merkle_root_hash: "".to_string() }
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    pub fn create_merkle_tree(&mut self, leaves: &Vec<String>) {
        let mut leaves_hashed:Vec<[u8;32]> = Vec::new();
        for leaf in leaves {
            let leaf_hashed: [u8; 32] = Sha256::hash(leaf.as_bytes());
            leaves_hashed.push(leaf_hashed);
        }

        for l in &leaves_hashed {
            log!("{:#?}", l);
        }

        let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves_hashed);
        
        let root = merkle_tree.root().ok_or("couldn't get the merkle root").unwrap();
        log!("Merkle root: {}", utils::collections::to_hex_string(&root));
        self.merkle_data = MerkleData { 
            leaves: leaves.to_vec(), 
            leaves_hashed, 
            merkle_root: root,
            merkle_root_hash: utils::collections::to_hex_string(&root)
        };
    }

    pub fn get_merkle_root(&self) -> String {
        utils::collections::to_hex_string(&self.merkle_data.merkle_root_hash)
    }

    pub fn claim(&mut self, expected_proof: &Vec<[u8; 32]>, leaf: &String) {
        let leaf_hashed: [u8;32] = Sha256::hash(leaf.as_bytes());
        let leaf_hashed_to_hex = utils::collections::to_hex_string(&leaf_hashed);
        log!("Te leaf hash you search is {:#?}", leaf_hashed_to_hex);

        let mut leaf_hashed_vec = Vec::new();
        leaf_hashed_vec.push(leaf_hashed);
        
        let leaf_indice = self.merkle_data.leaves.iter().position(|l| l == leaf).unwrap();
        
        log!("Te leaf index you search is {:#?}", leaf_indice);
        
        let mut leaf_indice_vec = Vec::new();
        leaf_indice_vec.push(leaf_indice);
        
        let total_leaves_count: usize = self.merkle_data.leaves.capacity();
        
        let expected_proof_copy = expected_proof.clone();
        
        let proof = MerkleProof::<Sha256>::new(expected_proof_copy);
        let result = proof.verify(self.merkle_data.merkle_root, &leaf_indice_vec, &leaf_hashed_vec, total_leaves_count);
        
        log!("Proof valid: {}", result);
        
        assert!(result, "Account is not valid for airdrop");
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;
}
