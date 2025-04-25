const express=require('express')
const path=require('path');
const fs=require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    fs.readdir('./files','utf-8', (err, files) => {
        if (err) 
            return res.status(500).send('Error reading directory');
            res.render('index',{files});   
    }
   
)});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
 const today = new Date();
 const day = String(today.getDate()).padStart(2, "0");
 const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
 const year = today.getFullYear();

 const filename=`${day}-${month}-${year}`;
 fs.writeFile(`./files/${filename}.txt`, req.body.taskinfo, (err) => {
 if(err) 
    return res.status(500).send('Error writing file');
  res.redirect("/");
}
  
)});

app.get("/edit/:task", (req, res) => {
  res.render("create");
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.use((error, req, res, next) => {
  res.status(500).send("Internal Server Error");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});