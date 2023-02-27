const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const ipfs = new IPFS({ host: 'ipfs.io/ipfs/', port: 5001, protocol: 'https' });

export default ipfs;