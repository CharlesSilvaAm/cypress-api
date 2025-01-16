describe('GET /api/users', () => {
  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
    cy.fixture('searchusers').then(function (searchusers) {
      this.searchusers = searchusers
    })
  })
  it('Search a user list', function () {
    const searchusers = this.searchusers.searchlist
    const loginAuth = this.users.authlogin

    cy.postLogin(loginAuth)
    .then(loginResponse => {
      console.log(loginResponse);
      const token = loginResponse.body.token;
      expect(token).not.to.be.empty;

    cy.getUsers( searchusers, token )
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.data).to.be.an('array');
    
        expect(response.body.data).to.have.length.greaterThan(0);
        
        response.body.data.forEach(item => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('name');
          expect(item).to.have.property('register');
          expect(item).to.have.property('email');
          })
        })
     })
  })
