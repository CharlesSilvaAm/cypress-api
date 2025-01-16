describe('GET/stepconfig', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('search a stepconfig step', function () {
        const loginAutheng = this.users.autheng

        cy.postLogin(loginAutheng)
            .then(loginResponse => {
                const token = loginResponse.body.token;

        cy.getConfig(token)
            .then(response => {
                expect(response.status).to.eq(200)
                const searchstep = response.body.data[0].step

        cy.getConfigstep(searchstep, token)
            .then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                const Step = response.body
                expect(Step).to.have.property('id')
                expect(Step).to.have.property('step')
                expect(response.body.step).to.equal('1-SEQUENTIAL')
                })
            })
        })

    })
})