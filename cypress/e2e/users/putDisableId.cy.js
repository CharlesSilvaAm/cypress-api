describe('PUT /api/users/disable/id', () => {
  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
    cy.fixture('createuser').then(function (createuser) {
      this.createuser = createuser
    })
  })
  it('Search user by id', function () {
    const searchusers = this.searchusers.searchlist
    const loginAuth = this.users.authlogin
    const user = this.createuser.create

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;
        cy.task('deleteUser', this.createuser.create.email)

        cy.postUser(user, token)
          .then(response => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))
            expect(response.body.message).to.equal('Users successfully created');

        cy.getUsers(searchusers, token)
            .then(response => {
            expect(response.status).to.eq(200)
            const userList = response.body.data;

                let desiredUser = null;
                for (const user of userList) {
                  if (user.email === 'user_api@teste.com') {
                    desiredUser = user;
                    break;
                  }
                }
                if (desiredUser) {
                  const userId = desiredUser.id;

                cy.putDisable(`${userId}`, token)
                  .then(userResponse => {
                    expect(userResponse.status).to.eq(200)
                    const user = userResponse.body
                    expect(user).to.have.property('id')
                    expect(user).to.have.property('name')
                    expect(user).to.have.property('register')
                    expect(user).to.have.property('email')
                    expect(userResponse.body.name).to.equal('Testando-Rast')
                    expect(userResponse.body.register).to.equal('testandoAPI')
                    expect(userResponse.body.email).to.equal('user_api@teste.com')
                  })
                }
              })
          })
      })
  })
})