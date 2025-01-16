describe('POST /Causes', () => {

    beforeEach(function () {
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('register a new cause', function () {
        const createcause = this.createuser.create_cause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        cy.log(JSON.stringify(response.body))
                        const user = response.body
                        expect(user).to.have.property('id')
                        expect(user).to.have.property('code')
                        expect(user).to.have.property('description')
                        expect(user).to.have.property('actionPlan')
                        expect(response.body.description).to.equal('TestesApiRastreabilidade')
                        expect(response.body.actionPlan).to.equal('RastreabilidadeTestado')
                    })
            })
    })
    it('duplicate cause', function () {
        const createcause = this.createuser.create_cause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;

                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Cause already exist')
 
                    })
            })
    })
    it('register blank cause', function () {
        const blankcause = this.createuser.blank_cause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;

                cy.postCause(blankcause, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('The Description field is required.')
                    })
            })
    })
    it('register blank cause plan ', function () {
        const blankplan = this.createuser.blank_causeplan
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;

                cy.postCause(blankplan, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('The ActionPlan field is required.')
                    })
            })
    })
    it('register inv sector ', function () {
        const invcause = this.createuser.inv_cause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;

                cy.postCause(invcause, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('The field Sector is invalid.')
                    })
            })
    })
    it('register a new cause operator FCT', function () {
        const createcause = this.createuser.create_cause
        const loginFct = this.users.authfct

        cy.postLoginFct(loginFct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new cause operator ICT', function () {
        const createcause = this.createuser.create_cause
        const loginIct = this.users.authict

        cy.postLoginIct(loginIct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new cause operator PCB', function () {
        const createcause = this.createuser.create_cause
        const loginPcb = this.users.authpcb

        cy.postLoginPcb(loginPcb)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteCause', this.createuser.create_cause.description)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postCause(createcause, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
})


