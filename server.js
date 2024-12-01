const express = require('express');
const app = express();
const PORT = 9005;

app.get('/', (req, res) => {
   return res.json({msg: 'API calls...'});
})

app.listen(PORT, () => {
    console.log(`App is running on - http://localhost:${PORT}`);
});