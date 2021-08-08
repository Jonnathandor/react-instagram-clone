import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage"
        src="https://cdn.pixabay.com/photo/2017/03/24/07/28/instagram-2170420_960_720.png" />
      </div>
      <Post
      username="Jonnathan"
      caption="elephant"
      imageUrl="https://cdn.pixabay.com/photo/2018/11/22/18/17/elephant-3832516_960_720.jpg"/>
            <Post
      username="Jonnathan"
      caption="elephant"
      imageUrl="https://cdn.pixabay.com/photo/2018/11/22/18/17/elephant-3832516_960_720.jpg"/>
            <Post
      username="Jonnathan"
      caption="elephant"
      imageUrl="https://cdn.pixabay.com/photo/2018/11/22/18/17/elephant-3832516_960_720.jpg"/>
            <Post
      username="Jonnathan"
      caption="elephant"
      imageUrl="https://cdn.pixabay.com/photo/2018/11/22/18/17/elephant-3832516_960_720.jpg"/>
    </div>
  );
}

export default App;
