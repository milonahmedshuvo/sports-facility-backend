import z from "zod";



const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        // role: z.enum(['user', 'admin']),
        address: z.string()
    })
})



const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    address: z.string().optional()
})




export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}