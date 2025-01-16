describe('GET/stepconfig', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('search a stepconfig', function () {
        const loginAuth = this.users.autheng

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getConfig(token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        cy.log(JSON.stringify(response.body))
                        const steps = response.body.data
                        expect(steps).to.be.an('array')
                        expect(steps).to.have.length(7)
    
                        const expectedSteps = ['1-SEQUENTIAL', '2-RADIAL', '3-SFAB','4-FVTBKFL', '5-BUTTON', '6-BATTERY', '7-LCD']
    
                        steps.forEach((step, index) => {
                            expect(step).to.have.property('id')
                            expect(step).to.have.property('step')
                            expect(step.step).to.equal(expectedSteps[index])
                })
            })
        })
    })
})