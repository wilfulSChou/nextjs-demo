const axios = require('axios')
const isServer = typeof window === 'undefined'
const github_base_url = 'https://api.github.com'
async function requestGithub(method, url, data, headers) {
    // console.log('lib/api requestGithub', url);
    
    return await axios({
        method,
        url: `${github_base_url}${url}`,
        data,
        headers
    })
}
async function request({ method = 'GET', url, data = {} }, req, res) {
    // console.log('lib/api request');
    
    if (!url) {
        throw Error('url must provide')
    }
    if (isServer) {
        // console.log('服务端请求');
        
        const session = req.session
        const githubAuth = session.githubAuth || {}
        const headers = {}
        if (githubAuth.access_token) {
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
        }
        return await requestGithub(method, url, data, headers)
    } else {
        // console.log('客户端请求');
        
        return await axios({
            method,
            url: `/github${url}`,
            data
        })
    }
}

module.exports = {
    request,
    requestGithub
}