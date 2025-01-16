describe('PATCH /api/tickets', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('editation').then(function (editation) {
            this.editation = editation
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
    })
    it('Update CRD-collection', function () {
        const createticket = this.createuser.create_ticket
        const loginEng = this.users.autheng
        const updateticket = this.editation.updateticket
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        cy.log(JSON.stringify(response.body))

                        cy.postLogin(loginEng)
                            .then(response => {
                                expect(response.status).to.eq(200)
                                const token = response.body.token;
                                expect(token).not.to.be.empty

                                cy.patchTicket(updateticket, token)
                                    .then(response => {
                                        expect(response.status).to.eq(204)

                                    })
                            })
                    })
            })
    })
})