const { requestGithub } = require('../lib/api')
module.exports = (server) => {
    server.use(async (ctx, next) => {
        const path = ctx.path
        
        if (path.startsWith('/github/')) {
            // console.log('server/api path=', path);
            // console.log('ctx.req.body', ctx.request.body);
            
            const method = ctx.method
            const session = ctx.session
            const githubAuth = session && session.githubAuth
            const token = githubAuth && githubAuth.access_token
            let headers = {}
            if (token) {
                headers['Authorization'] = `${githubAuth.token_type} ${token}`
            }
            const result = await requestGithub(
                method,
                ctx.url.replace('/github/', '/'),
                ctx.request.body || {},
                headers
            )
            ctx.status = result.status
            ctx.body = result.data
        } else {
            await next()
        }
    })
}
// module.exports = (server) => {
//     server.use(async (ctx, next) => {
//         const path = ctx.path
//         if (path.startsWith('/github/')) {
//             const githubAuth = ctx.session.githubAuth
//             const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`
//             const token = githubAuth && githubAuth.access_token
//             let headers = {}
//             if (token) {
//                 headers['Authorization'] = `${githubAuth.token_type} ${token}`
//             }
//             try {
//                 const result = await axios({
//                     method: 'GET',
//                     headers,
//                     url: githubPath
//                 })
//                 if (result.status === 200) {
//                     ctx.body = result.data
//                     ctx.set('Content-type', 'application/json')
//                 } else {
//                     ctx.status = result.status
//                     ctx.body = {
//                         success: false
//                     }
//                     ctx.set('Content-type', 'application/json')
//                 }
//             } catch(err){
//                 console.error(err);
//                 ctx.body = {
//                     success: false
//                 }
//                 ctx.set('Content-type', 'application/json')
//             }
//         } else {
//             await next()
//         }
//     })
// }