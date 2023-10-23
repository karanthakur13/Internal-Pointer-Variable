import bcrypt from "bcryptjs"

export const users =[
    {
        name: "Debjit Pramanick",
        email: "debjit1@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: true,
        greenCredits:0
    },
    {
        name: "Rohan Das",
        email: "rohan67@gmail.com",
        password: bcrypt.hashSync('1234',8),
        isAdmin: false,
        greenCredits:0
    },
    {
        name: "Tester",
        email:"testuser@gmail.com",
        password:bcrypt.hashSync('testuser',8),
        isAdmin:true,
        greenCredits:200
    }
]