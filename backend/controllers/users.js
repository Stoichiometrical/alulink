import User from "../models/User.js";



//update user
export const updateUser= async (req, res) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{ $set : req.body},{new:true})
        res.json(updateUser)
    }catch (err){
        res.status(500).json(err)
        console.log(err)
    }
}


//delete user
export const deleteUser= async (req, res,next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json("User has been deleted")

    }catch (err){
        res.status(500).json(err)
        console.log(err)
    }
}
//
// get user
export const getUser= async (req, res) => {
    try{
        const user = await User.findById(req.params.id,)
        res.json(user)
    }catch (err){
        res.status(500).json(err)
        console.log(err)
    }
}


//get users
export const getUsers =async(req, res) =>{
    try{
        const users= await User.find()
        res.json(users)
    }catch (err){
        res.status(500).json(err)
        console.log(err)
    }
}




// Update existing users
async function updateExistingUsers() {
    try {
        const users = await User.find({}); // Fetch all users

        for (const user of users) {
            user.description = ''; // Set default description
            user.meetinglink = ''; // Set default meetinglink
            user.title = '';       // Set default title
            user.image = '';       // Set default image

            await user.save(); // Save the updated user
        }

        console.log('Successfully updated existing users.');
    } catch (error) {
        console.error('Error updating existing users:', error);
    }
}

// updateExistingUsers();








