import z from 'zod'

// Zod schema definition
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    username: z.string().min(4)
});

export default userSchema