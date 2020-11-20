'use strict';
var expect = require('chai').expect;
var ikea = require('../dist/index.js');
describe('getName function test', () => {
    it('should return a name without swedish characters', () => {
        let containsSwedish = false;
        for (let i = 0; i < 10; i++) {
            var result = ikea.getName(false);
            if (result.indexOf("å") != -1 || result.indexOf("ö") != -1) {
                containsSwedish = true;
            }
        }
        console.log("\tresult: %s", result);
        expect(containsSwedish).to.equal(false);
    });
    it('should return a name between 5 and 10 characters', () => {
        var result = ikea.getName();
        console.log("\tresult: %s", result);
        expect((result.length >= 5 && result.length <= 10)).to.eq(true);
    });
});