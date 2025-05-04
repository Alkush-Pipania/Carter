# Cloudinary Setup for Carter Application

This guide will help you set up Cloudinary for image uploads in the Carter application.

## 1. Create a Cloudinary Account

If you don't have a Cloudinary account, sign up for free at [cloudinary.com](https://cloudinary.com/).

## 2. Get Your Cloudinary Credentials

After creating an account and logging in:

1. Go to your Cloudinary Dashboard
2. Find your account details in the dashboard
3. You'll need three key pieces of information:
   - Cloud Name
   - API Key
   - API Secret

## 3. Set Up Environment Variables

Add the following variables to your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials.

## 4. Restart Your Application

After adding the environment variables, restart your development server for the changes to take effect.

## Testing Your Setup

The application will now upload profile images to your Cloudinary account when users sign up. Images will be stored in the `carter_profiles` folder in your Cloudinary media library.
