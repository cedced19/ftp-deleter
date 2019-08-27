const Client = require('ftp');
const schedule = require('node-schedule');
const config = require('./config.json');

function formatDate(date) {
  d = date.getDate();
  m = date.getMonth() + 1;
  return date.getFullYear() + '' + ((m > 9) ? '' : '0') + m + ((d > 9) ? '' : '0') + d;
}

/**
 * Function to get date to keep with format YYYYMMDD
 */
function getKeepDate(depth) {
  let l = [];
  let date = new Date();
  for (i = 0; i < depth; i++) {
    date.setDate(date.getDate() - i);
    l.push(formatDate(date))
  }
  return l
}

function removeOldFolder() {
  let toKeep = getKeepDate(config.depth)
  let c = new Client();


  function remove (t) {
    return new Promise((resolve, reject) => {
      c.rmdir(t, true, function (err) {
        if (err) return reject(err)
        resolve();
      });
    });
  };

  c.on('ready', function () {
    c.list(config.path, (err, list) =>  {
      if (err) throw err;
      toDelete = [];
      list.forEach((el) => {
        if (!toKeep.includes(el.name) && el.name != '..') {
          toDelete.push(config.path + el.name);
        }
      });

      let promises = [];
      toDelete.map((path) => {
        promises.push(remove(path));
      });

      Promise.all(promises)
      .then(response => {
        /*console.log('Those files have been deleted');
        toDelete.forEach((path) => {
          console.log(path)
        });*/
        c.end()
      })
      .catch(error => console.log(`Error in executing ${error}`))
    });
  });

  c.connect(config.server);
}

removeOldFolder();
schedule.scheduleJob('autodelete', '0 0 1 * * *', function () {
  removeOldFolder();
});