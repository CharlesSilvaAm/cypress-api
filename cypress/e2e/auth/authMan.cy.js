// describe('POST /login/operator_MAN', () => {

//     beforeEach(function () {
//       cy.fixture('users').then(function (users) {
//         this.users = users
//       })
//     })
//     it('Authorization user login MAN', function () {
  
//       const manAuth = this.users.authman
//       cy.postLoginPcb(manAuth)
//         .then(response => {
//           const { register, token } = response.body
//           expect(response.status).to.eq(200)
//           cy.log(JSON.stringify(response.body))
//           expect(token).not.to.be.empty
//           expect(register).to.eq(pcbAuth.register);  
//           const user = response.body
  
//           expect(user).to.have.property('token')
//           expect(user).to.have.property('name')
//           expect(user).to.have.property('register')
//           expect(response.body.name).to.equal('operador_')
//           expect(response.body.register).to.equal('operador_')
//         })
//     })
// })
