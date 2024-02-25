const express = require('express');
const cors = require('cors');

const sequelize = require("./db");
const { Position, Member, Schedule, User } = require('./database/models');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const CheckMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, '222', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

app.get('/personnel', async (req, res) => {
    try {
        const positions = await Position.findAll({
            include: [
                { model: Member },
                { model: Schedule }
            ]
        });

        const responseData = positions.map(position => ({
            id: position.id,
            name: position.name,
            members: position.Members.map(member => ({
                id: member.id,
                name: member.name,
                contact: member.contact,
                experience: member.experience
            })),
            schedule: position.Schedules.map(schedule => ({
                id: schedule.id,
                date: schedule.date,
                time: schedule.time,
                room: schedule.room
            }))
        }));

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/members/:id', CheckMiddleware, async (req, res) => {
    const memberId = req.params.id;
    const { name, contact, experience } = req.body;

    try {
        const member = await Member.findByPk(memberId);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        member.name = name;
        member.contact = contact;
        member.experience = experience;
        await member.save();

        res.json({ message: 'Member information updated successfully' });
    } catch (error) {
        console.error('Error updating member information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/members/:id', CheckMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findByPk(id);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        await member.destroy();

        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/members', CheckMiddleware, async (req, res) => {
    try {
        const { name, contact, experience } = req.body;
        const newMember = await Member.create({
            name,
            contact,
            experience
        });

        res.status(201).json({ message: 'Member added successfully', member: newMember });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/members', async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/schedules', CheckMiddleware, async (req, res) => {
    const { positionId, date, time, room } = req.body;

    try {
        const position = await Position.findByPk(positionId);
        if (!position) {
            return res.status(404).json({ error: 'Position not found' });
        }

        const newSchedule = await Schedule.create({
            date,
            time,
            room,
            PositionId: positionId
        });

        res.status(201).json({ message: 'Schedule added successfully', schedule: newSchedule });
    } catch (error) {
        console.error('Error adding schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            include: [
                { model: Position, include: [Member] }
            ]
        });

        const responseData = schedules.map(schedule => ({
            id: schedule.id,
            room: schedule.room,
            doctor: schedule.Position?.Members[0]?.name,
            date: schedule.date,
            time: schedule.time,
            status: schedule.status
        }));
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/schedules/:id', CheckMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const schedule = await Schedule.findByPk(id);

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        schedule.status = status;
        await schedule.save();

        res.json({ message: 'Schedule status updated successfully', schedule });
    } catch (error) {
        console.error('Error updating schedule status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/schedules/:id', CheckMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findByPk(id);

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        await schedule.destroy();

        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/positions', async (req, res) => {
    try {
        const positions = await Position.findAll();
        res.json(positions);
    } catch (error) {
        console.error('Error fetching positions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/positions', CheckMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const newPosition = await Position.create({ name });
        res.status(201).json(newPosition);
    } catch (error) {
        console.error('Error creating position:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/positions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const position = await Position.findByPk(id);

        if (!position) {
            return res.status(404).json({ error: 'Position not found' });
        }

        res.json(position);
    } catch (error) {
        console.error('Error fetching position:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/positions/:id', CheckMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const position = await Position.findByPk(id);

        if (!position) {
            return res.status(404).json({ error: 'Position not found' });
        }

        position.name = name;
        await position.save();

        res.json(position);
    } catch (error) {
        console.error('Error updating position:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/positions/:id', CheckMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const position = await Position.findByPk(id);

        if (!position) {
            return res.status(404).json({ error: 'Position not found' });
        }

        await position.destroy();

        res.json({ message: 'Position deleted successfully' });
    } catch (error) {
        console.error('Error deleting position:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }

        const newUser = await User.create({
            username,
            password,
        });

        const token = jwt.sign({ id: newUser.id, username: newUser.username, role: 'user' }, '222', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isPasswordValid = password == user.password;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '222', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/users/:id', CheckMiddleware, async (req, res) => {
    const userId = req.params.id;
    const { username, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password != currentPassword) {
            return res.status(401).json({ error: 'Password mismatch' });
        }

        user.username = username;
        user.password = newPassword;

        await user.save();

        const token = jwt.sign({ id: user.id, username: user.username }, '222', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start()