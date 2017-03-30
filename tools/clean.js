var fs = require('fs-extra-promise');

module.exports = {
  name: 'clean',

  job: async () => {
    await fs.remove('./.tmp/');
    await fs.remove('./dist/');
    return 'cleaned';
  }
};
