describe('PATCH /api/tickets', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('editation').then(function (editation) {
            this.editation = editation
        })
        cy.fixture('searchusers').then(function (searchusers) {
            this.searchusers = searchusers
          })
    })

    it('Up ticket id', function () {
        const updateticketid = this.editation.updateticketid
        const loginAuth = this.users.authlogin
        const listTicket = this.searchusers.searchticket

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getTicket(listTicket, token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.body.data).to.be.an('array');
                        expect(response.body.data).to.have.length.greaterThan(0);
                        const ticket_Id = response.body.data[0].id
                    
                cy.patchTicketId(updateticketid,`${ticket_Id}`, token)
                    .then(response => {
                        expect(response.status).to.eq(204)
                    })
            })
        })
    })
})    