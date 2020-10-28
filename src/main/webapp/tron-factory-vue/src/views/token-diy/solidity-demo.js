
const tronSolidity = require('./solidity-js_0.5.12_GreatVoyage_v4.0.1')
const solcWrapper = require('solc/wrapper')
const solc = solcWrapper(tronSolidity)

const contractFile = 'tokenDIY.sol'
const contractName = 'TokenDIY'
const contractCode = `
  pragma solidity >=0.4.22 <=0.7.4;
  
  /**
   * @title Storage
   * @dev Store & retrieve value in a variable
   */
  contract ${contractName} {
  
      uint256 number;
  
      /**
       * @dev Store value in variable
       * @param num value to store
       */
      function store(uint256 num) public {
          number = num;
      }
  
      /**
       * @dev Return value 
       * @return value of 'number'
       */
      function retrieve() public view returns (uint256){
          return number;
      }
  }
`

let input = {
  language: 'Solidity',
  sources: {
    [contractFile]: {
      content: contractCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

let output = JSON.parse(solc.compile(JSON.stringify(input)))

// console.log('output: ', output.contracts[contractFile])
console.log('output abi: ', JSON.stringify(output.contracts[contractFile][contractName].abi))
console.log('')
console.log('output bytecode: ', output.contracts[contractFile][contractName].evm.bytecode.object)
