// pages/api/updatePost.ts
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../ConnectDatabase';

export async function PUT(request: Request) {
    const requestData = await request.json();
    const { id, title, content, facebook, tiktok, instagram, youtube, author, audio, thumbnail, public_at } = requestData;

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

        const updateFields: any = {};
        if (title !== undefined) updateFields.title = title;
        if (content !== undefined) updateFields.content = content;
        if (facebook !== undefined) updateFields.facebook = facebook;
        if (tiktok !== undefined) updateFields.tiktok = tiktok;
        if (instagram !== undefined) updateFields.instagram = instagram;
        if (youtube !== undefined) updateFields.youtube = youtube;
        if (author !== undefined) updateFields.author = author;
        if (audio !== undefined) updateFields.audio = audio;
        if (thumbnail !== undefined) updateFields.thumbnail = thumbnail;
        if (public_at !== undefined) updateFields.public_at = public_at;

        const result = await collection.updateOne(
            { id },
            { $set: updateFields }
        );

        if (result.matchedCount === 1) {
            return new Response(JSON.stringify({
                message: 'Success',
                code: 200,
                data: {
                    success: true,
                    message: 'Post updated successfully'
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
        console.error('Error updating post:', error);
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
