//migracion del segundo contrato

const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const  UpgradeablePet = artifacts.require('UpgradeablePet');
const UpgradeablePetV2 = artifacts.require('UpgradeablePetV2.sol');

module.exports = async function (deployer) {
    const alreadyDeployed = await UpgradeablePet.deployed();
    await upgradeProxy(alreadyDeployed.address, UpgradeablePetV2, { deployer });
}