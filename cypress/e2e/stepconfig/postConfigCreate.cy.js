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
    it('create StepConfig', function () {
        const loginAutheng = this.users.autheng
        const postGrnAllowed = this.createuser.create_grnallowed
        const postStepConfig = this.createuser.create_stepconfig
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAutheng)
            .then(loginResponse => {
                const token = loginResponse.body.token;
                cy.task('deleteGrnAllowed', this.createuser.create_grnallowed.material)
                cy.task('deleteGrnAllowed', this.editation.updatematerials.material)
        
        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;
                cy.task('deleteItem', this.createuser.create_item.grn)
                
        cy.postItem(createitem, token)
            .then(response => {
                expect(response.status).to.eq(201)

        cy.postLogin(loginAutheng)
            .then(loginResponse => {
                const token = loginResponse.body.token;
        
        cy.postCreateGrn(postGrnAllowed, token)
            .then(response => {
                expect(response.status).to.eq(201)
                cy.task('deleteStepConfig', this.createuser.create_stepconfig.grn)
        
        cy.postCreateStep(postStepConfig, token)
            .then(response => {
                expect(response.status).to.eq(204)
                })
              })
            })  
          })
        })
      })
    })
  })

