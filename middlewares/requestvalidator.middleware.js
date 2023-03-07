const JOI = require("joi")
exports.RequestValidator = (schema)=>{
    return async (req,res,next)=>{
        try {
            await schema.validateAsync(req.body)
            next()
        } catch (error) {
            const err = new Error(error.details[0].message)
            err.status = 422
            next(err)
        }
    }
}
exports.Schemas = {
    auth:{
        signin:JOI.object({
            username:JOI.string().required(),
            password:JOI.string().required()
        })
    },
    user: {
        create: JOI.object({
            username: JOI.string().required(),
            password: JOI.string().required(),
        }),
    },
    company:{
        create:JOI.object({
            companyName:JOI.string().required(),
            creatorId:JOI.string().required(),
            vatNumber:JOI.number().required(),
            taxRegistration:JOI.number().required(),
            emailAddress:JOI.string().required()
        }),
        delete:JOI.object({
            companyId:JOI.string().required(),
            creatorId:JOI.string().required()
        }),
        addEmployer:JOI.object({
            companyId:JOI.string().required(),
            creatorId:JOI.string().required(),
            employerId:JOI.string().required()
        }),
        deleteEmployer:JOI.object({
            companyId:JOI.string().required(),
            creatorId:JOI.string().required(),
            employerId:JOI.string().required()
        }),
        getEmployerCompany:JOI.object({
            employerId:JOI.string().required()
        })
    }
}