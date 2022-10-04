const {HTTPError} = require ('../exception/HTTPException.js');
const {decodeToken} = require ('../helper/authenticate.js');

const extractAuthenticationInfo = (req, res, next) => {
	try {
		let authHeader = req.headers.authorization
		if (authHeader.split(" ")[0] != 'Bearer') throw HTTPError(400, "Invalid Authentication Method")
		let token = authHeader.trim().split(" ")[1]
		let payload = decodeToken(token)

		req.user = payload
		next()
	} catch (error) {
		console.error(error)
		next(new HTTPError(403, "Forbidden"))
	}
};
module.exports = {
  extractAuthenticationInfo: extractAuthenticationInfo,
};
