const { createInterface } = require('readline');
const  initInput  = require('../app/app');
// Creation of readline instance
describe('check country input', () => {
    
    it('should returns uk when an array is null', () => {
        const input  = "UK:B123AB1234567:Gloves:20:Mask:10";
        const fetchedIndexElement = initInput(input);
        //expect(fetchedIndexElement).toBe(-1);
    })
  
})