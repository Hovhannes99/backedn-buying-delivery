const  Token= require("../../models/Token");
const  User = require("../../models/User");
const hashPassword = require("../../utils/hashPassword");

const resetPassword = async (req, res) => {
    try {
        const { newPassword, email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const tokenFromDB = await Token.findOne({ email });
        if (!tokenFromDB) {
            return res.status(401).json({ message: "User does not have reset password token" });
        }

        const hashedPassword = await hashPassword(newPassword, 7);

        const updatedUser = await User.findOneAndUpdate(
            { email: user.email },
            { $set: { password: hashedPassword } }
        );
        await Token.findOneAndDelete({ email : user.email })

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = resetPassword;
