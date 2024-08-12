import z from 'zod'

const createFacilityValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
})




const facilityValidationSchema = {
    createFacilityValidationSchema
}