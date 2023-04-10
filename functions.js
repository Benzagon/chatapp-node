const { PrismaClient } = require('@prisma/client') 
const prisma = new  PrismaClient()

async function createUser(name, email, password){
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
};

async function deleteUser(id){
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    });
    return ("Deleted user " + id)
};

async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
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