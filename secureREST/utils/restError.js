class RestError extends Error {

    constructor(message = "Unknown Error", status = 500, moduleName) {

        super(message)

        this.status = status

        this.moduleName = moduleName
    }
}

module.exports = RestError