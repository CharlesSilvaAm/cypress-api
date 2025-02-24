const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { connectToDatabase } = require('./cypress/support/sqlserver')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://172.16.16.73:3333',
    video: true,
    projectId: 'f2960497-eb5f-4e7b-ab4b-819b2f14d34c',
    recordKey: "f2960497-eb5f-4e7b-ab4b-819b2f14d34c",
    async setupNodeEvents(on, config) {
      allureWriter(on, config)
      config.db = await connectToDatabase();
      on('task', {
        async deleteUser(email) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.Users WHERE Email='${email}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteParam(ValueLog) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.Params WHERE ValueLog='${ValueLog}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteItem(grn) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.Items WHERE Grn='${grn}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteCause(description) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.Causes WHERE Description='${description}';`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteTicket(serial) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.Tickets WHERE serial='${serial}';`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deletePcb(grn) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.EnelPCB WHERE grn='${grn}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteGrnAllowed(material) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.GrnAllowed WHERE Material='${material}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
        async deleteStepConfig(grn) {
          const request = config.db.request();
          const query = `DELETE FROM [rastreabilidade].dbo.GrnConsumes WHERE grn='${grn}'`;
          await request.query(query);
          console.dir(request)
          return null;
        },
      })
      return config
    }
  }
})
