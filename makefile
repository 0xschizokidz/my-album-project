-include .env

build:; forge build

deploy-sepolia:
	forge script script/DeployAlbum.s.sol:DeployAlbum --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast

deploy-anvil:
	forge script script/DeployAlbum.s.sol:DeployAlbum --rpc-url $(ANVIL_RPC_URL) --private-key $(ANVIL_PRIVATE_KEY) --broadcast