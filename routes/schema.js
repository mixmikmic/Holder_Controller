const e = require('express');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const NavLinkService = require('../services/NavLinkService');
const navLinkService = new NavLinkService();
navLinkService.registerCustomLinks([
    { "label": "active", "url": "/schema/active" },
]);

router.use(function (req, res, next) {
    navLinkService.clearLinkClasses();
    navLinkService.setNavLinkActive('/schema');
    next();
});

router.get('/', async function (req, res, next) {
    res.redirect('/schema/active');
});

router.get('/active', async function (req, res, next) {
    const agentService = require('../services/AgentService');
    const allSchema = await agentService.getSchema();
    const schema = []
    await allSchema.schema_ids.forEach( (e,i) => {      
        schema[i] = { "schema_id" : e , "schema_name" : e.split(":")[2] }
     });
     console.log(schema);
    res.render('schema', {
        navLinks: navLinkService.getNavLinks(),
        customNavLinks: navLinkService.getCustomNavLinks(),
        schema
    });
});

router.get('/:id/remove', async function (req, res, next) {
    const connectionId = req.params.id;
    const state = req.query.state || '';

    if (connectionId) {
        const agentService = require('../services/AgentService');
        await agentService.removeConnection(connectionId);
    }

    const redirectUrl = `/connections/${state === 'invitation' ? 'pending' : 'active'}`;
    res.redirect(redirectUrl);
});

module.exports = router;