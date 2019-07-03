const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = 'f10ea84707f405e80d1a'
module.exports = {
    github: {
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id,
        client_secret: '01a17c7a33e63d2bd692a1de8989891e5a85634b'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}

// access_token=516b64984ed8db66493993cfe65b1b84aea71347