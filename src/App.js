import './App.css';
import { useState, useEffect } from 'react';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles, Button, Input } from '@material-ui/core';

function getModalStyle(){
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => {
      alert(error); 
      console.log(error);
    });
  }


  return (
    <div className="App">

      <Modal
      open={open}
      onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage"
              src="https://cdn.pixabay.com/photo/2017/03/24/07/28/instagram-2170420_960_720.png"
              alt="" />
            </center>
            <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}/>
            <Input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}/>
            <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage"
        src="https://cdn.pixabay.com/photo/2017/03/24/07/28/instagram-2170420_960_720.png"
        alt="" />
      </div>
      { user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Sign up</Button>
      )}
      

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
