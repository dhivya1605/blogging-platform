const  mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            
        }
    ],
    comments:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            message:{
                    type:String,
                    required:true,
                    trim:true
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Blog",blogSchema);