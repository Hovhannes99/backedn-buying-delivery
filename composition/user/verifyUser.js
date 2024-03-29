const  User = require("../../models/User");
const  Token  = require("../../models/Token");
const  comparePasswords  = require("../../utils/comparePasswords");

const verifyUser = async (req, res) => {
    try {
        const { verificationCode, email } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ errors: { message: "USER_NOT_FOUND" } });
        }


        if (user?.isVerified) {
            await Token.findOneAndDelete({ email });

            return res.status(200).json({message: {isVerified: true}})
        }
        const tokenFromDB = await Token.findOne({email});
        if (!tokenFromDB) {
            return res.status(401).json({
                errors: { message: "User does not have a token" },
            });
        }

        const tokenIsMatching = await comparePasswords(verificationCode, tokenFromDB?.token);

        if (!tokenIsMatching) {
            await User.findOneAndDelete({email})
            return res.status(401).json({ errors: { token: "TOKEN_NOT_VALID" } });
        }


        await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
        return res.status(200).json({message: {isVerified: true}})
    } catch (err) {
        return res.send(err.message);
    }
};

module.exports = verifyUser;
