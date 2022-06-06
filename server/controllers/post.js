import Post from '../models/post';
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const createPost = async (req, res) => {
    const { content, image } = req.body;
    if (content.length < 2) {
        return res.json({
            error: 'Content must 2 character or more',
        })
    }
    try {
        const post = new Post({ content, image, postedBy: req.user._id })
        post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const uploadImage = async (req, res) => {
    // console.log("Request File => ", req.files)
    try {
        let result = await cloudinary.uploader.upload(req.files.image.path)
        console.log('Uploaded Image url => ', result)
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        console.log(error)
    }

}

export const postByUser = async (req, res) => {
    try {
        // const posts = await Post.find({ postedBy: req.user._id })
        const posts = await Post.find()
            .populate('postedBy', '_id name image')
            .sort({ createdAt: -1 })
            .limit(10);
        console.log("Post =>", posts)
        res.json(posts)
    } catch (error) {
        console.log(error)
    }
}

export const userPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id)
        res.json(post)
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (req, res) => {
    const { content } = req.body;
    if (content.length < 2) {
        return res.json({
            error: 'Content must 2 character or more',
        })
    }
    try {
        const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        })
        post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}