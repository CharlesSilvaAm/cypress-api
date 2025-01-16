describe('POST /user', () => {

  beforeEach(function () {
    cy.fixture('createuser').then(function (createuser) {
      this.createuser = createuser
    })
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })
  it('register a new user', function () {
    const user = this.createuser.create
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        cy.task('deleteUser', this.createuser.create.email);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

        cy.postUser(user, token)
          .then(response => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))
            expect(response.body.message).to.equal('Users successfully created');
          })
      })
  })
  it('duplicate email', function () {
    const user = this.createuser.dup_user
    const loginAuth = this.users.authlogin
    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;

        cy.postUser(user, token)
          .then(response => {
            expect(response.status).to.eq(400);
            expect(response.body.errors.Login).to.include('The Login field is required.');
          })
      })
  })
    context('required fields', function () {
      describe('Create User', function () {
      let user;

      beforeEach(function () {
        cy.fixture('createuser').then(function (createuser) {
          user = createuser.required;
        })
      })

      it('name is required', function () {
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
          .then(loginResponse => {
            console.log(loginResponse);
            cy.task('deleteUser', this.createuser.create.email);
            const token = loginResponse.body.token;
            expect(token).not.to.be.empty;

            delete user.name
            cy.postUser(user, token)
              .then(response => {
                expect(response.status).to.eq(400)
                cy.log(JSON.stringify(response.body))
                expect(response.body.errors.Name[0]).to.equal("Name is required");
              })
            })
        it('register is required', function () {
          const loginAuth = this.users.authlogin
          const user = this.createuser.create

            cy.postLogin(loginAuth)
              .then(loginResponse => {
                console.log(loginResponse);
                //cy.task('deleteUser', this.createuser.create.email);
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                delete user.register
                cy.postUser(user, token)
                 .then(response => {
                  expect(response.status).to.eq(400);
                  expect(response.body).to.be.empty;
                  cy.log(JSON.stringify(response.body))
                  expect(response.body.errors.Name[0]).to.equal("register is required");

                 })
              })
          })
      })
    })
  })
})
