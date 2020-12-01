const upload = require('express-fileupload');
const fs = require('fs');

const User = require('../../models/User');

const path = './src/uploads/';

exports.getDataUser = async (req,res)=>{ 
    const dataUser = await User.findById(req.user.id);
    res.json({
        error: null,
        dataUser
    });
}

exports.getAllDataUsers = async (req, res)=>{
    const userId = req.params.id;
    const allDataUsers = await User.find({$nor: [{_id: userId}]});
    const dataUsers = []
    
    await allDataUsers.forEach(async (user) => {
        await dataUsers.push({
            _id: user._id,
            name: user.name,
            url: user.url
        });
    });
    res.json({dataUsers});
}

exports.updateDataUser = async (req, res)=>{
    const dataUser = await User.findById(req.user.id);
    await dataUser.updateOne(req.body);
    dataUser.save();
    res.json({
        status: 'Profile updated'
    })
}

exports.fileUpload = async (req, res)=>{
    if(req.files){
        const file = req.files.file;
        const id = req.params.id;
        const user = await User.findById(id);

        fs.readdir(path, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                if(file === `${id}.png`){
                    fs.unlink(`${path}${id}.png`, function(err) {
                        if (err) throw err 
                        console.log("Successfully deleted the file.")
                    })
                }
            });
        }); 

        user.url = true;
        await user.save();

        await file.mv(`./src/uploads/${id}.png` , err=>{
           if(err){
                console.log(err);
            }else{
                res.send('File uploaded');
            }
        });
    }
}

exports.follow = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
}