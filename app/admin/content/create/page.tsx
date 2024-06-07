'use client'
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation'

export default function CreateContent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Title:', title);
        console.log('Content:', content);
        // You can add logic to save the data to a database or API
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto px-5 md:px-0 md:w-3/5 pb-10 pt-5">
            {/* <h1 className="text-2xl font-bold mb-6 text-pink-300">Write new content</h1> */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    {/* <label htmlFor="title" className="block text-sm font-medium text-pink-300">
                        Title
                    </label> */}
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-2 h-[35px] mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black-500"
                        required
                    />
                </div>
                <div>
                    {/* <label htmlFor="content" className="block text-sm font-medium text-pink-300">
                        Content
                    </label> */}
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Go Back
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
