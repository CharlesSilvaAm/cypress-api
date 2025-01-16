describe('POST /param', () => {

  beforeEach(function () {
    cy.fixture('createuser').then(function (createuser) {
      this.createuser = createuser
    })
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })
  it('register a new user', function () {
    const createparam = this.createuser.create_param
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))
            const user = response.body

            expect(user).to.have.property('id')
            expect(user).to.have.property('valueLog')
            expect(user).to.have.property('valueConverted')
            expect(user).to.have.property('process')
            expect(response.body.valueLog).to.equal('test-rest-API')
            expect(response.body.valueConverted).to.equal('rest-API')
          })
      })
  })
  it('duplicate parameter', function () {
    const createparam = this.createuser.create_param
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;

        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(201)
            const user = response.body
          })
        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(400)
            cy.contains('Param already exist')
            cy.contains('Value Log already exist')
            
          })
      })
  })
  it('mandatory log field', function () {
    const create_param_log_field = this.createuser.create_param_log_field
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;

        cy.postParam(create_param_log_field, token)
          .then(response => {
            expect(response.status).to.eq(400)
            cy.contains('ValueLog is required')
          })
      })
  })
  it('mandatory converted field', function () {
    const create_param_converted_field = this.createuser.create_param_converted_field
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;

        cy.postParam(create_param_converted_field, token)
          .then(response => {
            expect(response.status).to.eq(400)
            cy.contains('ValueConverted is required')
          })
      })
  })
  it('blank registration attempt', function () {
    const create_param_blank_registration = this.createuser.create_param_blank_registration
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;

        cy.postParam(create_param_blank_registration, token)
          .then(response => {
            expect(response.status).to.eq(400)
            cy.contains('ValueConverted is required')
            cy.contains('ValueLog is required')
          })
      })
  })
  it('register a new user operator FCT', function () {
    const createparam = this.createuser.create_param
    const loginFct = this.users.authfct

    cy.postLoginFct(loginFct)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('register a new user operator ICT', function () {
    const createparam = this.createuser.create_param
    const loginIct = this.users.authict

    cy.postLoginIct(loginIct)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
  it('register a new user operator PCB', function () {
    const createparam = this.createuser.create_param
    const loginPcb = this.users.authpcb

    cy.postLoginPcb(loginPcb)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteParam', this.createuser.create_param.valueLog);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postParam(createparam, token)
          .then(response => {
            expect(response.status).to.eq(403)
          })
      })
  })
})


