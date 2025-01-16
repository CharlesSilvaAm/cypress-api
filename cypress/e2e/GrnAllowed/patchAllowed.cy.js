describe('PATCH/ grn-allowed', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('editation').then(function (editation){
            this.editation = editation
        })
    })
    it('Update a grn-allowed', function () {
        const loginAuth = this.users.autheng
        const updateMaterial = this.editation.updatematerial

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;
                
        cy.patchUpdateMaterial(updateMaterial, token)
            .then(response => {
                expect(response.status).to.eq(204)  
            })
        })
      })
   })
