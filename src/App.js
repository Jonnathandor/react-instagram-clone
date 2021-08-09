import './App.css';
import { useState, useEffect } from 'react';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage"
        src="https://cdn.pixabay.com/photo/2017/03/24/07/28/instagram-2170420_960_720.png"
        alt="" />
      </div>
      {posts.map(({ id, post }) => (
        <Post 
        key={id}
        username={post.username} 
        caption={post.caption}
        imageUrl={post.imageUrl}/>
      ))}
    </div>
  );
}

export default App;
