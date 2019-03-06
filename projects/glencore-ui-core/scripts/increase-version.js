const fs = require("fs");

const filePath = `${__dirname}/../package.json`;
const packageData = fs.readFileSync(filePath);


const getNewPackageData = (packageData) => {
  const obj = JSON.parse(packageData);
  const versionFilePath = `${__dirname}/version.txt`;
  const versionData = fs.readFileSync(versionFilePath);
  const version = JSON.parse(versionData).version;
  const arrVersion = version.split('.'); 
  arrVersion[2] = (parseInt(arrVersion[2]) + 1) + '';
  obj.version = arrVersion.join('.');
  // have to write back to .version file
  fs.writeFileSync(versionFilePath, JSON.stringify({version: obj.version}, null, 2));
  return JSON.stringify(obj, null, 2);
};

fs.writeFile(filePath, getNewPackageData(packageData), (err) => {  
  if (err) throw err;
  
  console.log('Data written to package.json');
});
