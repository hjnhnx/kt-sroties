// pages/api/addPost.ts
import connectToDatabase from '../ConnectDatabase';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('posts');
        const result = await collection.find({}).sort({ created_at: -1 }).toArray();

        return Response.json({
            message: 'Success',
            code: 200,
            data: {
                success: true,
                result: result
            }
          })
        
    } catch (error: any) {
        console.error('Error adding post:', error);
        return Response.json({
            message: 'Internal Server Error',
          code: 500,
          data: {
            success: false,
            error
        }
        })
    }
}
    