const express = require('express');
const { default: mongoose } = require('mongoose');
//const { dirname } = require('path');
const morgan = require('morgan');

const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

//connect to mongoDB
const dbURI = 'mongodb+srv://user1:user1234@cluster0.cdsu905.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then((result) => //listen for requests:
  app.listen(3000))
  .catch((err) => console.log(err));

//express app
const app = express();

//register view engine:
app.set('view engine', 'ejs');
//app.set()



//middleware static files:
app.use(express.static('styles'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes:
app.get('/add-blog', (req,res) => {
  const blog = new Blog({
    title: 'new Blog2',
    snippet: 'about my new Blog',
    body: 'more about my new Blog'
  });

  blog.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
      });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('65e83dc8f96ccfa9384940d9')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

//middleware:
// app.use((req, res, next) => {
//   console.log('New request made');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });


//Routes:
app.get('/', (req, res) => {
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum not again this bogus'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum not again this bogus'},
  //   {title: 'How to d Browser', snippet: 'Lorem ipsum not again this bogus'},
  // ];
  res.redirect('/blogs');
  //res.send('<p><h1> Home page </h1></p>');
  res.render('index', {title: 'Home', blogs});
});

//middleware:
// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

app.get('/about', (req, res) => {
  //res.send('<p><h1> about page </h1></p>');
  res.render('about', {title: 'About'});
});

  //redirects:
  // app.get('/about-us', (req, res) => {
  //   res.redirect('/about');
  // });

  //blog routes:
  app.use('/blogs', blogRoutes);

  //404 page: this error page should be at last cause if it above then it wont run the pages below it as 404 is not specified with any particular page.
  app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
  });


