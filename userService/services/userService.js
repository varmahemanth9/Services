import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import * as client from '../commonFunctions/redis.js';
import { USER_REDIS_KEYS } from '../constants/constants.js';
import { generateOTP } from '../commonFunctions/helperFuntions.js';

export const generateUserOtp = async (req) => {
    const { phoneNumber } = req.body;
    const user = await User.findOneAndUpdate(
        { phoneNumber },
        { lastLoginAttempt: Date.now() },
        { new: true, upsert: true }
    );
    const userOtpKey = `${USER_REDIS_KEYS.AUTH_OTP}${user._id}`;
    let otp = await client.getKey(userOtpKey);
    if (!otp) {
        otp = generateOTP();
        await client.setKeyWithExpiry(userOtpKey, otp);
    }
    return {
        message: 'OTP generated and saved successfully',
        phoneNumber: user.phoneNumber,
        user: user._id,
        otp,
    };
};

export const verifyUserOtp = async (req) => {
    const { userId, otp } = req.body;
    const user = await User.findOneAndUpdate(
        { _id: userId },
        { isVerified: true },
        { new: true }
    );
    if (!user) {
        throw new Error("No user found");
    }
    const userOtpKey = `${USER_REDIS_KEYS.AUTH_OTP}${user._id}`;
    const userTokenKey = `${USER_REDIS_KEYS.AUTH_TOKEN}${user._id}`
    const redisOtp = await client.getKey(userOtpKey);
    if (!redisOtp) throw new Error("OTP Expired");
    if (redisOtp!==otp) throw new Error("Invaid OTP");
    const authToken = jwt.sign({ userId: user._id, phoneNumber: user.phoneNumber }, process.env.SECRET, { expiresIn: '30d' });
    await client.setKeyWithExpiry(userTokenKey, authToken, 2592000);
    await client.delKey(userOtpKey);
    return {
        message: 'Logged in successfully',
        authToken
    };
};