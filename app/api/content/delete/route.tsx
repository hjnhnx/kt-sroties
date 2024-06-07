// pages/api/deletePost.ts
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../ConnectDatabase';

export async function DELETE(request: Request) {
    const requestData = await request.json();
    const { id } = requestData;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('posts');
        const result = await collection.deleteOne({ id });

        if (result.deletedCount === 1) {
            return Response.json({
                message: 'Success',
                code: 200,
                data: {
                    success: true,
                    message: 'Post deleted successfully'
                }
            });
        } else {
            return Response.json({
                message: 'Error',
                code: 404,
                data: {
                    success: false,
                    error: 'Post not found'
                }
            });
        }
    } catch (error: any) {
        console.error('Error deleting post:', error);
        return Response.json({
            message: 'Internal Server Error',
            code: 500,
            data: {
                success: false,
                error
            }
        });
    }
}
