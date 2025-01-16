describe('GET/stepconfig', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
        cy.fixture('editation').then(function (editation) {
            this.editation = editation
        })
    })
    it('create Grn Allowed', function () {
        const loginAuth = this.users.autheng
        const updateMaterials = this.editation.updatematerials
        const postGrnAllowed = this.createuser.create_grnallowed

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;
                cy.task('deleteGrnAllowed', this.createuser.create_grnallowed.material)
                cy.task('deleteGrnAllowed', this.editation.updatematerials.material)

        cy.getConfig(token)
            .then(response => {
                expect(response.status).to.eq(200)
        
        cy.postCreateGrn(postGrnAllowed, token)
            .then(response => {
                expect(response.status).to.eq(201)
                cy.log(JSON.stringify(response.body))
                const grnAllowed = response.body
                expect(grnAllowed).to.have.property('stepId')
                expect(grnAllowed).to.have.property('material')
                expect(grnAllowed).to.have.property('material_descr')
                expect(grnAllowed).to.have.property('id')
                expect(grnAllowed).to.have.property('createdAt')
                expect(grnAllowed).to.have.property('updatedAt')
                expect(response.body.material).to.equal('testeRastreabilidade')
                expect(response.body.material_descr).to.equal('rastreabilidadeTeste')
            })
      })
    })
  })
})