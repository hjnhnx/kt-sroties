// pages/api/getPostById.ts
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../ConnectDatabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({
            message: 'Bad Request: Missing ID',
            code: 400,
            data: {
                success: false,
                error: 'ID is required'
            }
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('posts');
        const post = await collection.findOne({ id });

        if (post) {
            return new Response(JSON.stringify({
                message: 'Success',
                code: 200,
                data: {
                    success: true,
                    post
                }
            }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            });
        } else {
            return new Response(JSON.stringify({
                message: 'Post not found',
                code: 404,
                data: {
                    success: false,
                    error: 'Post not found'
                }
            }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
    } catch (error: any) {
        console.error('Error finding post:', error);
        return new Response(JSON.stringify({
            message: 'Internal Server Error',
            code: 500,
            data: {
                success: false,
                error
            }
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
