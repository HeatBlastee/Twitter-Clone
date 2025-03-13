import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";
import Notification from "../models/notification.model.js";


export const getUserProfile = async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile: ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getSuggestedUsers = async(req,res)=>{
    try {
       const userId  = req.user._id;
       const usersFollowedByMe = await User.findById(userId).select("followings");

       const users = await User.aggregate([
        {
            $match:{
                _id:{$ne:userId},
            },
        },
        {$sample:{size:10}},
       ]);
       const filteredUsers = users.filter((user) => !usersFollowedByMe.followings.includes(user._id));
 		const suggestedUsers = filteredUsers.slice(0, 4);
 
 		suggestedUsers.forEach((user) => (user.password = null));
 
 		res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in getSuggestedUsers: ", error.message);
 		res.status(500).json({ error: error.message });
    }
};
export const followUnfollowUser = async (req, res) => {
    const { id } = req.params;

    try {
       

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const modifyUser = await User.findById(id);
        if (!modifyUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = await User.findById(req.user._id);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow/unfollow yourself" });
        }

        if (modifyUser.followers.includes(req.user._id)) {
            modifyUser.followers = modifyUser.followers.filter((userId) => userId.toString() !== req.user._id.toString());
            currentUser.followings = currentUser.followings.filter((userId) => userId.toString() !== modifyUser._id.toString());
            await modifyUser.save();
            await currentUser.save();
            return res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            modifyUser.followers.push(req.user._id);
            currentUser.followings.push(modifyUser._id);
            await modifyUser.save();
            await currentUser.save();

            const newNotification = new Notification({
                from: req.user._id,
                to: id,
                type: "follow",
            });
            await newNotification.save();

            return res.status(200).json({ message: "User followed successfully" });
        }
    } catch (error) {
        console.log("Error in followUnfollowUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async (req,res)=>{
    const {fullname,currentPassword,newPassword,bio,link,username,email} = req.body;
    let {profileImg, coverImg} = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if(!user) return res.status(404).json({message:"user not found"});

        if(!newPassword && currentPassword || currentPassword && !newPassword){
            return res.status(400).json({
                error:"Please provide both the passwords"
            });
        }
        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword,user.password);
            if(!isMatch) return res.status(400).json({error:"current password is incorrect"});
            if(newPassword<6) return res.status(400).json({error : "password must be longer than 6 charaters"});
            const salt = await bcrypt.getSalt(10);
            user.password = await bcrypt.hash(newPassword,salt);

        }

        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);

            }
            const uploadResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadResponse.secure_url;
        }
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
 		user.username = username || user.username;
 		user.bio = bio || user.bio;
 		user.link = link || user.link;
 		user.profileImg = profileImg || user.profileImg;
 		user.coverImg = coverImg || user.coverImg;
 
 		user = await user.save();
 
 		// password should be null in response
 		user.password = null;
 
 		return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
 		res.status(500).json({ error: error.message });
    }
}