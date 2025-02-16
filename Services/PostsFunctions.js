const cloudinary=require('../config')
const Post=require("../Models/Post") 
const create_post=async (req,res)=>{
    const new_post=new Post({
        UserID:req.body.UserID,
        title:req.body.title,
        tags:req.body.tags,
        Job_Description:req.body.Job_Description,
        location:req.body.location,
        budget:req.body.budget,
        status:req.body.status
    })

    if(req.body.photo_link){
    new_post.photo_link=await cloudinary.uploader.upload(req.body.photo_link,{
        resource_type:"image",
        "public_id":'Finalproject/Post/'+new_post._id+'-'+req.body.title
    }).then((result)=>{
        return result.url
    }).catch((err)=>{
        console.log("error",JSON.stringify(err))
    })
    }
    new_post.save(function(err, data) {
        if(err) {
            console.log(err) 
        }
        else {
            res.send("Data inserted") 
            
        }
    }) 
}

const delete_post=(req,res)=>{
    Post.findOneAndDelete({_id:req.body._id},(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send("Post deleted ")
        }
    })
}

const get_post=(req,res)=>{
    Post.find({UserID:req.body.UserID},(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send(data)
        }
    })
}


module.exports={create_post,delete_post,get_post}