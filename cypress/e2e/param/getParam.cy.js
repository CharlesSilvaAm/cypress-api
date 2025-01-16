describe('GET /param', () => {

  beforeEach(function () {
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })
  it('search a param list', function () {
    const listparam = this.searchusers.searchparam
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.url().then(url => {
          const newUrl = url.concat('?Process=0');
          cy.getParam(newUrl, listparam, token)
            .then(response => {
              expect(response.status).to.eq(200)
              cy.log(JSON.stringify(response.body))
              expect(response.body.data).to.be.an('array');

              expect(response.body.data).to.have.length.greaterThan(0);

              response.body.data.forEach(item => {
                expect(item).to.have.property('id')
                expect(item).to.have.property('valueLog')
                expect(item).to.have.property('valueConverted')
                expect(item).to.have.property('process')
              })
            })
        })
      })
  })
  it('search a param list operator FCT', function () {
    const listparam = this.searchusers.searchparam
    const loginFct = this.users.authfct

    cy.postLoginFct(loginFct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.url().then(url => {
          const newUrl = url.concat('?Process=0');
          cy.getParam(newUrl, listparam, token)
            .then(response => {
              expect(response.status).to.eq(403)
            })
        })
      })
  })
  it('search a param list operator ICT', function () {
    const listparam = this.searchusers.searchparam
    const loginIct = this.users.authict

    cy.postLoginIct(loginIct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.url().then(url => {
          const newUrl = url.concat('?Process=0');
          cy.getParam(newUrl, listparam, token)
            .then(response => {
              expect(response.status).to.eq(403)
            })
        })
      })
  })
  it('search a param list operator PCB', function () {
    const listparam = this.searchusers.searchparam
    const loginPcb = this.users.authpcb

    cy.postLoginPcb(loginPcb)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.url().then(url => {
          const newUrl = url.concat('?Process=0');
          cy.getParam(newUrl, listparam, token)
            .then(response => {
              expect(response.status).to.eq(403)
            })
        })
      })
  })
})