import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import ArticleUpdateForm from '../ArticleUpdateForm/ArticleUpdateForm'; // Assuming you create this component for editing

function OwnerArticle() {
  const [articleData, setArticleData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch all articles
  const fetchReporterArticles = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please login again.");
        return;
      }

      const response = await axios.get("http://localhost:3001/auth/fetch-reporter-articles", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setArticleData(response.data.reporterArticles);
      } else {
        setError("Error fetching articles.");
      }

    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred while fetching your articles.");
    }
  };

  // Delete an article
  const deleteArticle = async (articleId) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`http://localhost:3001/auth/delete-article/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setArticleData(articleData.filter((article) => article._id !== articleId));
      alert("Article deleted successfully");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article");
    }
  };

  // Update an article
  const handleUpdate = async (updatedArticle) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(`http://localhost:3001/auth/update-article/${updatedArticle._id}`, updatedArticle, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setArticleData(articleData.map((article) =>
        article._id === updatedArticle._id ? response.data : article
      ));
      setSelectedArticle(null);
      alert("Article updated successfully");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article");
    }
  };

  useEffect(() => {
    fetchReporterArticles();
  }, []);

  return (
    <div>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full flex flex-col space-y-2">
          <div>
            <h2 className="font-semibold text-slate-800 capitalize">My Articles</h2>
          </div>
          <div className="w-full md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col">
            {articleData && articleData.map((newsItem, index) => (
              <div key={index} className="relative">
                <NewsCard newsItem={newsItem} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => deleteArticle(newsItem._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedArticle(newsItem)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedArticle && (
            <ArticleUpdateForm
              article={selectedArticle}
              onUpdate={handleUpdate}
              onCancel={() => setSelectedArticle(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerArticle;
