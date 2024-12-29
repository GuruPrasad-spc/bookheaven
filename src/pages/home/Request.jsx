import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';

const RequestPage = () => {
  const { currentUser } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const request = {
      title: data.booktitle,
      email: currentUser ?.email,
      isbn: data.isbn,
      author: data.author,
    };
  
    try {
      await axios.post('/api/request', request); // Send request to backend
      alert('Request placed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place request.');
    }
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Request a Book</h2>
            <p>Please fill out the form below to Request a Book. We will inform you as soon as the book is available.</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Book Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="booktitle">Book Title</label>
                      <input
                        {...register('booktitle', { required: 'Book title is required' })}
                        type="text"
                        name="booktitle"
                        id="booktitle"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.booktitle && <p className="text-red-500 text-sm">{errors.booktitle.message}</p>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="isbn">ISBN number</label>
                      <input
                        {...register('isbn', { required: 'ISBN is required' })}
                        type="text"
                        name="isbn"
                        id="isbn"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="author">Author</label>
                      <input
                        {...register('author', { required: 'Author is required' })}
                        type="text"
                        name="author"
                        id="author"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        disabled
                        value={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestPage;
