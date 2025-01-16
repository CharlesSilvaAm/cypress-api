describe('GET /api/users/id', () => {
  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
  })
  it('Search user by id', function () {
    const searchusers = this.searchusers.searchlist
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
      .then(loginResponse => {
        console.log(loginResponse);
        const token = loginResponse.body.token;
        expect(token).not.to.be.empty;

    cy.getUsers(searchusers, token)
      .then(response => {
        expect(response.status).to.eq(200)
        const userList = response.body.data;

          let desiredUser = null;
          for (const user of userList) {
            if (user.email === 'mat@mat.com') {
          desiredUser = user;
            break;
             }
            }
            if (desiredUser) {
              const userId = desiredUser.id;

    cy.getUserId(`${userId}`, token)
      .then(userResponse => {
        expect(userResponse.status).to.eq(200)
        const user = userResponse.body

        expect(user).to.have.property('id')
        expect(user).to.have.property('name')
        expect(user).to.have.property('register')
        expect(user).to.have.property('email')
         })
       }
    })
  })
})
})
