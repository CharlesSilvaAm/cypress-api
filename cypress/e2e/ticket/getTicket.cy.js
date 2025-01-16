describe('GET /Ticket', () => {

  beforeEach(function () {
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
    cy.fixture('users').then(function (users) {
      this.users = users
    })
    cy.fixture('createuser').then(function (createuser) {
      this.createuser = createuser
    })
  })
  it('search a ticket list', function () {
    const listTicket = this.searchusers.searchticket
    const loginAuth = this.users.authlogin
    const createticket = this.createuser.create_ticket

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteTicket', this.createuser.create_ticket.serial)
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postTicket(createticket, token)
        .then(response => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))

        cy.getTicket(listTicket, token)
          .then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body.data).to.be.an('array');

            expect(response.body.data).to.have.length.greaterThan(0);

            response.body.data.forEach(ticket => {
              expect(ticket).to.have.property('id')
              expect(ticket).to.have.property('numberTicket')
              expect(ticket).to.have.property('description')
              expect(ticket).to.have.property('serial')
            })
          })
      })})
  })
  it('search a ticket list operator FCT', function () {
    const listTicket = this.searchusers.searchticket
    const loginFct = this.users.authfct

    cy.postLoginFct(loginFct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getTicket(listTicket, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('search a ticket list operator ICT', function () {
    const listTicket = this.searchusers.searchticket
    const loginIct = this.users.authict

    cy.postLoginIct(loginIct)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getTicket(listTicket, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('search a ticket list operator PCB', function () {
    const listTicket = this.searchusers.searchticket
    const loginPcb = this.users.authpcb

    cy.postLoginPcb(loginPcb)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.getTicket(listTicket, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
})