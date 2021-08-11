const User = require('../model/userModel');
const UserCtrl={
    getAll:async(req,res)=>{
        try {
            const user = await User.find();
            res.json({
                count:user.length,
                data: user
            });
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    },
    getSingle:async(req,res)=>{
        try {
            const id= req.params.id;
            const user = await User.findById({_id:id});
            res.json(user);
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    },
    create:async(req,res)=>{
        try {
            const{name,email,mobile,address,qualification} = req.body;
            const user = await User.findOne({email});
            if(user)
                res.status(400).json({msg:'User exists'});
            const newUser= new User({name,email,mobile,address,qualification});
            await newUser.save();
            res.status(200).json({msg:'User created'})
        } catch (error) {
            res.status(500).json({msg:error.message});
        }
    },
    update:async(req,res)=>{
        try {
            // const id=req.params.id;
            const{name,email,mobile,address,qualification}=req.body;

            await User.findOneAndUpdate({_id:req.params.id},{name,email,mobile,address,qualification});
            res.status(200).json({msg:"user upadated"})
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    delete:async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({msg: "successfully delated"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
};
module.exports=UserCtrl;