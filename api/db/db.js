const sql = require("mssql");
const config = require("../config");
class Connection {
    constructor() {
        this.connectToDb();
    }

    connectToDb = async () => {
        try {
            this.pool = await sql.connect(config.sql);
        } catch (error) {
            console.log("Connection to database failed : ", error);
            process.exit(1);
        }
    };

    createRequest = (request, data = {}) => {
        const keys = Object.keys(data);

        keys.map((keyName) => {
            const keyValue = data[keyName];
            request.input(keyName, keyValue);
        });
        return request;
    };

    exec = async (procName, data = {}) => {
        var request = await this.pool.request();
        request = this.createRequest(request, data);

        const results = await request.execute(procName);
        return results;
    };

    query = async (query, options) => {
        const results = await this.pool.request().query(query);
        return results;
    };
}

module.exports = {
    exec: new Connection().exec,
    query: new Connection().query,
};
