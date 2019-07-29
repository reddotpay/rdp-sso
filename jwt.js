const jsonwebtoken = require('jsonwebtoken');
// import * as jsonwebtoken from 'jsonwebtoken';

class jwtClass {
	constructor() {
		this.jwt = jsonwebtoken;
		this.algo = 'RS256';
		this.public_key = process.env.VUE_APP_RDP_SSO_PUB;
		this.issuer = process.env.VUE_APP_RDP_SSO_ISS;
		this.options = {
			algorithm: this.algo,
			issuer: this.issuer,
		};
	}

	verifyToken(token) {
		try {
			const verify = this.jwt.verify(token, this.public_key, this.options);
			return verify;
		} catch (err) {
			return false;
		}
	}

	generatePublicToken(payload, expiresIn) {
		const publicOptions = this.options;
		publicOptions.algorithm = 'none';
		if (typeof expiresIn !== 'undefined' && expiresIn) {
			publicOptions.expiresIn = expiresIn;
		}
		const token = this.jwt.sign(payload, '', publicOptions);
		return token;
	}

	verifyPublicToken(token) {
		try {
			const publicOptions = this.options;
			publicOptions.algorithm = 'none';
			publicOptions.ignoreExpiration = false;
			if (!this.jwt.verify(token, '', publicOptions)) {
				return false;
			}
			return true;
		} catch (err) {
			return false;
		}
	}
}

// module.exports = new jwtClass();
const JWT = jwtClass;
const jwt = new JWT();

// export default jwt;
module.exports = jwt;
