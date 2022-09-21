const express = require('express');
const router = express.Router();
const password = "ZIAD";
 
module.exports = function Admin(client) {
  router.get('/premium', function (req, res) {
    let password = req.query.password;
    
    if (!password && !req.session.unlocked) return res.status(200);
    
    if (password != password) return res.status(200);
    
    req.session.unlocked = true;
    
    res.render('admin/premium.ejs');
  });
  
  router.post('/premium', (req, res) => {
    if (!req.session.unlocked) return res.json({
      status: 0,
      message: 'Authorization denied'
    });
    
    const { number, ownerid, clientid, clienttoken, guildid, endtime } = req.body;
    
    const premiums = client.database('premiumData', 'premdata', {
      bots: [],
      toggle: true
    }, !0);
    
    let data = premiums.get;
    
    let formatter = {
      free: null,
      '5m': 1000 * 60 * 5,
      '1w': 1000 * 60 * 60 * 24 * 7,
      '1mo': 1000 * 60 * 60 * 24 * 30
    }
    
    data.bots.push({
      number: number,
      sold: false,
      owner: ownerid || '910482674915885077',
      token: clienttoken || "OTkxNjY2Njk0NDQ5Nzk5MTk5.GXQ4GT.xaDXSrC3jTr6057pvzi3xJcf01tUFJQ2P4eGLc",
      guildID: guildid || '1003696006770208849',
      clientID: clientid || "991666694449799199",
      time: formatter[endtime],
      now: Date.now()
    });
   
 
    premiums.set(data);
    
    res.json({
      message: 'Saved changes successfully!',
      status: 1
    });
     setTimeout(() => {
     process.exit(1);
     }, 10000);
  });
  
  return router;
}