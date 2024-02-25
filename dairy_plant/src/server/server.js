const express = require('express');
const cors = require('cors');

const sequelize = require("./db");
const { Position, Member, Schedule } = require('./database/models');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

app.put('/members/:id', async (req, res) => {
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

app.delete('/members/:id', async (req, res) => {
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

app.post('/members', async (req, res) => {
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


app.post('/schedules', async (req, res) => {
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

app.put('/schedules/:id', async (req, res) => {
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

app.delete('/schedules/:id', async (req, res) => {
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

app.post('/positions', async (req, res) => {
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

app.put('/positions/:id', async (req, res) => {
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

app.delete('/positions/:id', async (req, res) => {
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