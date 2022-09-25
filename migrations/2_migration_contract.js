const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const UpgradeablePet = artifacts.require('UpgradeablePet');
 
module.exports = async function(deployer,accounts){
    await deployProxy(UpgradeablePet, [accounts[0]], {deployer,initializer:'initialize'});
}