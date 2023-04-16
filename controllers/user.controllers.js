import { PrismaClient } from '@prisma/client';
const prisma = new  PrismaClient();

import bcrypt from "bcrypt";
import { response } from 'express';

async function createUser(name, email, password){
    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hash,
        }
    });
};

async function deleteUserById(id){
    const deletedUser = await prisma.user.delete({
        where: {
            id: id,
        },
    });
    return ("User deleted: " + id)
};

async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
    return users;
};

async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    //Como puedo hacer que tire error?
    return user;
};

async function createChat(messages, id){
    const createChat = await prisma.chat.create({
        data: {
            history: messages,
            userId: id
        }
    })
    return ("Chat created with id: " + id)
};

async function getChatsByUser(){
    const chats = await prisma.user.findMany({
        include: {}
    })
};

export const testApi = (req, res) => {
    res.send("Api running OK...");
};

export const users = (req, res) => {
    getUsers().then((a) => res.send(a)).catch((e) => console.error(e));
};

export const signup = (req, res) => {    
    const {name, email, password} = req.body;
    
    createUser(name, email, password).then((a) => {
        console.log("Created user");
        res.json({msg: "User created"});

    }).catch((e) => {
        console.error(e);
        res.status(500);
        res.json({msg: "Error creating user"});
        
    });
};

export const login = (req, res) => {
    const {email, password} = req.body;

    getUserByEmail(email).then(async (user) => {
        if(user == null) return res.status(404).json({msg: 'User not found'});

        const verifyPassword = await bcrypt.compare(password, user.password)
  
        if(!verifyPassword) {
            console.log('Incorrect password');
            return res.status(401).json({msg: 'Incorrect password'});
        };

        console.log('Login succesful');
        return res.send(user);

    }).catch((e) => {
        console.error(e);
        res.status(500);
        res.json({msg: "Error connecting to DB"});
    })
};

export const deleteUser = (req, res) => {
    deleteUserById(parseInt(req.params.id)).then((a) => res.send(a)).catch((e) => console.error(e));
};

export const newChat = (req, res) => {
    createChat(req.body.messages, req.body.id).then((a) => res.send(a)).catch((e) => console.error(e));
};

export const getChats = (req, res) => {
    getChatsByUser().then((a) => res.send(a)).catch((e) => console.error(e));
};