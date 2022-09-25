// ambiente de pruebas unitarias del contrato
// const { expect } = require('chai');
// const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
// const { UpgradeablePet } = artifacts.require('UpgradeablePet');

// contract('UpgradeablePet', function ([ owner,other ]) {
//     const value = new BN('8');
//      beforeEach(async function() {
//         this.instance = await UpgradeablePet.new({from: owner});
//      });

//         //testeando las funciones
//      it('Should retrieve correctly stored value',async function () {
      
//         await this.instance.store(value, {from: owner});
//         expect(await this.instance.retrieve()).to.be.bignumber.equal(value);
//      });

//     // testeando el evento
//      it('Set emit an event', async function () {
     
//         const receipt = await this.instance.store(value, {from: owner});
//         expectEvent(receipt, 'ValueChanged', {value: value});
//      });

//      //solo el owner puede cambiar el valor del store
//      it('Only owner can changed the value', async function () {
      
//         await expectRevert(this.instance.store(value, {from: other}), 'UpgradeablePet: caller is not owner!');
//      });
// });

const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const UpgradeablePet = artifacts.require("UpgradeablePet");

contract("UpgradeablePet", function (accounts) {
  it("should retrieve correctly stored value", async function () {
    const upgradeablePetInstance = await UpgradeablePet.deployed();
    let tx = await upgradeablePetInstance.store(5);
    expectEvent(tx, "ValueChanged", { value: "5" });
    let value = await upgradeablePetInstance.retrieve();
    assert.equal(value, 5, "UpgradeablePet did not store correct value");
  });
  it("should not set the stored value if not owner", async function () {
    const upgradeablePetInstance = await UpgradeablePet.deployed();
    // Failed require in function
    await expectRevert(upgradeablePetInstance.store(10, {from: accounts[1]}), "UpgradeablePet: not owner");
    let value = await upgradeablePetInstance.retrieve();
    assert.equal(value, 5, "UpgradeablePet value should not have changed");
  });
});
