import  auth  from 'next-auth'
import { authOptions } from '@/lib/authOptions';

const handler = auth(authOptions)

export { handler as GET, handler as POST }