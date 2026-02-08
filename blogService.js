// blogService.js
// This module handles blog post CRUD operations

import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { format } from 'date-fns';

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), 'posts.json');



/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
    const data = {
        nextId: 1,
        posts: []
    };
    await writeFile(postsFile, JSON.stringify(data, null, 2));
}

/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object
 */
export async function createPost(title, content) {
    let data;

    try{
        const file = await readFile(postsFile, 'utf-8');
        data = JSON.parse(file);
    }catch {
        data = {nextId: 1, posts: []};
    }

    const newPost = {
        id: data.nextId,
        title,
        content,
        createdAt: format(new Date(), 'y-M-d h:m aaa')
    };

    data.posts.push(newPost);
    data.nextId++;

    await writeFile(postsFile, JSON.stringify(data, null, 2));

    return newPost;
}

/**
 * Find and return a post by its ID.
 * @param {number} id - Post ID
 * @returns {object|undefined} The post if found, otherwise undefined
 */
export async function readPost(id) {
    let data;

    try{
        const file = await readFile(postsFile, 'utf-8');
        data = JSON.parse(file);
    }catch {
        return undefined;
    }
    
    for (const post of data.posts) {
        if (post.id == id) {
            return post;
        }
    }

    return undefined
}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
    let data;

    try{
        const file = await readFile(postsFile, 'utf-8');
        data = JSON.parse(file);
    }catch {
        return false;
    }

    for (let i=0; i<data.posts.length; i++) {
        if (data.posts[i].id == id) {
            if (newTitle != undefined) {
                data.posts[i].title = newTitle;
            }
            if (newContent != undefined) {
                data.posts[i].content = newContent;
            }
            await writeFile(postsFile, JSON.stringify(data, null, 2))
            return true;
        }
    }

    return false;
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
    let data;

    try{
        const file = await readFile(postsFile, 'utf-8');
        data = JSON.parse(file);
    }catch {
        return false;
    }

    for (let i=0; i<data.posts.length; i++) {
        if (data.posts[i].id == id) {
            data.posts.splice(i,1);
            await writeFile(postsFile, JSON.stringify(data, null, 2));
            return true;
        }
    }

    return false;
}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
    let data;

    try{
        const file = await readFile(postsFile, 'utf-8');
        data = JSON.parse(file);
    }catch {
        return [];
    }

    return data.posts;
}

