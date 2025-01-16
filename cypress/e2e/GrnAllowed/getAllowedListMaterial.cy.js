describe('GET/ grn-allowed', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('search a grn-allowed step', function () {
        const loginAuth = this.users.autheng

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;

        cy.getConfig(token)
            .then(response => {
                expect(response.status).to.eq(200)
                const searchmaterial = response.body.data[0].step
                    
        cy.getAllowedStep(searchmaterial, token)
            .then(response => {
                expect(response.status).to.eq(200)
                const searchlistmaterial = response.body[0].stepId
                
        cy.getAllowedListMaterial(searchlistmaterial, token)
            .then(response => {
                expect(response.status).to.eq(200)
                }) 
            })
          })
       })
    })
})