import React, { useState } from 'react';

const ArticleUpdateForm = ({ article, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(article);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Update Article</h2>
      <input
        type="text"
        name="newsHeading"
        value={formData.newsHeading}
        onChange={handleChange}
        placeholder="Heading"
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        name="newsDescription"
        value={formData.newsDescription}
        onChange={handleChange}
        placeholder="Short Description"
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        placeholder="Cover Image URL"
        className="w-full mb-3 p-2 border rounded"
      />
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Update</button>
      </div>
    </form>
  );
};

export default ArticleUpdateForm;
