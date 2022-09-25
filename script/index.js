const { makeInterfaceId } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");

module.exports = async function makeInterfaceId(callback) {
    try{
        //obteniendo las cuentas
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        //instanciando el contrato
        const UpgradeablePet = artifacts.require('UpgradeablePet');
        const intance = await UpgradeablePet.deployed();

        //mostando el resultado de store
        console.log('El valor almacenado es: ',(await intance.retrieve()).toString());
     
        callback(0);
    }catch(err){
        console.err();
        callback(1);
    }
}