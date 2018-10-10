const OktaVerifier = require('@okta/jwt-verifier')

const oktaVerifier = new OktaVerifier({

    issuer: `${process.env.ISSUER}`,

    assertClaims: {aud: 'http://localhost:8080/users/'},
})

module.exports = async (req, res, next) => {

    try {
        const {authorization} = req.headers

        if (!authorization) throw new Error('You must send an Authorization header')

        const [authType, token] = authorization.trim().split(' ')

        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

        /*        const {claims} = await oktaVerifier.verifyAccessToken(token)

                if (!claims.scp.includes(process.env.SCOPE)) {

                    throw new Error('Could not verify the proper scope')
                }*/


       const res =  oktaVerifier.verifyAccessToken(token)

        next()
    }

    catch (err) {

        next(err)
    }


}