describe('GET /itens', () => {

  beforeEach(function () {
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })
  it('search a item list', function () {
    const listitem = this.searchusers.searchitems
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getItem(listitem, token)
          .then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body.data).to.be.an('array');

            // expect(response.body.data).to.have.length.greaterThan(0);

            // response.body.data.forEach(item => {
            //   expect(item).to.have.property('id')
            //   expect(item).to.have.property('grn')
            //   expect(item).to.have.property('material')
            //   expect(item).to.have.property('material_descr')
          })
      })
  })
  it('search a item list operator FCT', function () {
    const listitem = this.searchusers.searchitems
    const loginFct = this.users.authfct

    cy.postLoginFct(loginFct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getItem(listitem, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('search a item list operator ICT', function () {
    const listitem = this.searchusers.searchitems
    const loginIct = this.users.authict

    cy.postLoginIct(loginIct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getItem(listitem, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('search a item list operator PCB', function () {
    const listitem = this.searchusers.searchitems
    const loginPcb = this.users.authpcb

    cy.postLoginPcb(loginPcb)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getItem(listitem, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
})