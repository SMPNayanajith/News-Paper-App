    const mongoose = require('mongoose');
    const AuthUser = mongoose.model('AuthUser');

    const reporterMiddleware = async(req,res,next)=>{
        try {
        const authUser = await AuthUser.findById(req.userId).populate('reporter');
        if(authUser && authUser.roleType === 'reporter' && authUser.reporter)
            {
                req.reporter = authUser.reporter;
                next();
            } else{
                res.status(403).json({error:'Access denieded, Only reporters can create articles'});
            }
            
        } catch (error) {
            console.error('Reporter Middleware error',error);
            res.status(500).json({error:'Interna server error'});
            
        }
    }

    module.exports = reporterMiddleware;