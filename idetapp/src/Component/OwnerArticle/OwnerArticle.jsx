import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OwnerArticle() {
  const [ownerArticles, setOwnerArticles] = useState([]);

  // Function to fetch owner's articles
  const fetchOwnerArticles = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Fetch the owner's articles using the token in the Authorization header
      const response = await axios.get('http://localhost:3001/auth/fetch-owner-articles', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Assuming the response contains an array of article IDs, fetch each article
      const articleIds = response.data.articles;

      if (articleIds.length > 0) {
        // Fetch full article details using the article IDs
        const fullArticlesResponse = await axios.post('http://localhost:3001/auth/fetch-article-details', { articleIds });

        setOwnerArticles(fullArticlesResponse.data);
      } else {
        console.log("No articles found for this user.");
      }

    } catch (error) {
      console.error('Error fetching owner articles:', error);
    }
  };

  useEffect(() => {
    fetchOwnerArticles();  // Fetch articles when the component mounts
  }, []);

  return (
    <div>
      <h2>Your Articles</h2>
      <div>
        {ownerArticles.length > 0 ? (
          ownerArticles.map((article, index) => (
            <div key={index}>
              <h3>{article.newsHeading}</h3>
              <p>{article.newsDescription}</p>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default OwnerArticle;
