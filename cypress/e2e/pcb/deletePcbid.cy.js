describe('DELETE /pcb', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
    })

    it('register a new pcb', function () {
        const loginAuth = this.users.authlogin
        const create_pcb = this.createuser.create_pcb

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        const pcbId = response.body.id

                        cy.deletePcbId(pcbId, token)
                            .then(userResponse => {
                                expect(userResponse.status).to.eq(204)
                            })

                    })
            })
    })
})
