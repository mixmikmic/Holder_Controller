const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const NavLinkService = require('../services/NavLinkService');
  const navLinkService = new NavLinkService();

  res.render('index', { navLinks: navLinkService.getNavLinks() });
});

router.get('/status', async function(req, res, next) {
  const agentService = require('../services/AgentService');

  const status = await agentService.getStatus();
  res.status(200).json({ status: status ? 'up' : 'down' });
});



// router.post('/webhooks/topic/connections/', (req,res)=> {
//   console.log("Agent_2",req.body);
//   res.end();
// });

// router.post('/webhooks/topic/issue_credential_v2_0', (req,res)=> {
//   console.log("Agent_2 Issue_cred",req.body);
//   res.end();
// });

// router.post('/webhooks1/topic/issue_credential_v2_0', (req,res)=> {
//   console.log("Agent_1 Issue_cred",req.body);
//   res.end();
// });

// router.post('/webhooks1/topic/connections/', (req,res)=> {
//   console.log("Agent_1",req.body);
//   res.end();
// });

router.post('/webhooks/topic/:id', (req,res)=> {
  console.log("Agent_2", req.params.id ,req.body);
  res.end();
});

module.exports = router;
