describe('GET/stepconfig', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('search a stepconfig list', function () {
        const loginAutheng = this.users.autheng

        cy.postLogin(loginAutheng)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getConfiglist(token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        cy.log(JSON.stringify(response.body))
                        const steps = response.body
                        expect(steps).to.be.an('array')
                        expect(steps).to.have.length(7)
    
                        const expectedSteps = ['4-FVTBKFL', '7-LCD', '1-SEQUENTIAL', '3-SFAB', '5-BUTTON', '2-RADIAL', '6-BATTERY']
    
                        steps.forEach((step, index) => {
                            expect(step).to.have.property('id')
                            expect(step).to.have.property('step')
                            expect(step.step).to.equal(expectedSteps[index])
                    })
            })
        })

    })
})