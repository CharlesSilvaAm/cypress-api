describe('PUT/ grn-allowed', () => {
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
    it('Update a grn-allowed Materials', function () {
        const loginAuth = this.users.autheng
        const updateMaterials = this.editation.updatematerials
        const postGrnAllowed = this.createuser.create_grnallowed

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;
                cy.task('deleteGrnAllowed', this.editation.updatematerials.material)
                cy.task('deleteGrnAllowed', this.createuser.create_grnallowed.material)
        cy.postCreateGrn(postGrnAllowed, token)
            .then(response => {
                expect(response.status).to.eq(201)

        cy.getConfig(token)
            .then(response => {
                expect(response.status).to.eq(200)
                const searchmaterial = response.body.data[0].step
                    
        cy.getAllowedStep(searchmaterial, token)
            .then(response => {
                expect(response.status).to.eq(200)
                const searchallowedid = response.body[0].id

        cy.putUpdateMaterials(searchallowedid, updateMaterials, token)
            .then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                const steps = response.body
                expect(steps).to.have.property('material')
                expect(steps.material).to.equal('testeRastreabilidade-API')
              })
            }) 
        })
      })  
    })
  })
})