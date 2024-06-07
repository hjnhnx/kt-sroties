// pages/api/addPost.ts
import connectToDatabase from '../../ConnectDatabase';
import { createHash } from 'crypto';

export async function POST(request: Request) {
    const requestData = await request.json();
    const { title, content, author } = requestData;

    try {
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
        const hash = createHash('sha256').update(currentTime).digest('hex');
        const db = await connectToDatabase();
        const collection = db.collection('posts');
        const result = await collection.insertOne(
            {
                id: hash,
                title, 
                author: author || "Kee Tiểu Phẩm",
                content, 
                facebook: "", 
                tiktok: "", 
                instagram: "", 
                youtube: "", 
                audio: "", 
                thumbnail: "", 
                public_at: "", 
                created_at: currentTime
            }
        );

        return Response.json({
            message: 'Success',
            code: 201,
            data: {
                success: true,
                result
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