const sql = require('mssql');

// const config = {
//     user: 'jabilrastrebilidadeadm',
//     password: 'Adm@jabilrastreabilidade',
//     server: 'http://172.16.16.36',
//     database: 'jabil-rastreabilidade',
//     options: {
//         encrypt: true, // Se necessário
//         trustServerCertificate: true // Se necessário
//     },
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
// };
const connectionString = "Data Source=172.16.16.36;Initial Catalog=jabil-rastreabilidade;User ID=jabilrastrebilidadeadm;Password=Adm@jabilrastreabilidade; TrustServerCertificate=True"
// const connectionString = 'Server=172.16.16.36;Database=jabil-rastreabilidade;User Id=jabilrastrebilidadeadm;Password=Adm@jabilrastreabilidade;Encrypt=true;TrustSererCertificate=true'
async function connectToDatabase() {
    try {
        const db = await sql.connect(connectionString);

        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        return db;
        //sql.close()
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error; 
    }
}
module.exports = { connectToDatabase };

// function deleteFromUsersTable(email) {
//     return pool.request()
//         .input('email', sql.VarChar(255), email)
//         .query('DELETE FROM [jabil-rastreabilidade].dbo.Users WHERE Email = @email');
// }

// Chame a função para conectar ao banco de dados
// connectToDatabase();