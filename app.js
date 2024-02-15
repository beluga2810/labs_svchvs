const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const personelDataPath = './personelData.json'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/personel', async (req, res) => {
  try {
    const jsonData = await fs.readFile(personelDataPath, 'utf8');
    const data = JSON.parse(jsonData);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/personel', async (req, res) => {
  try {
    const jsonData = await fs.readFile(personelDataPath, 'utf8');
    const data = JSON.parse(jsonData);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/addPersonel', async (req, res) => {
  const newMember = req.body;

  try {
    const rawData = await fs.readFile(personelDataPath);
    const personelsData = JSON.parse(rawData);

    const ingeneer = personelsData.find(personel => personel.name === 'Инженер');

    if (!ingeneer) {
      return res.status(404).json({ error: 'ingeneer not found' });
    }

    ingeneer.members.push(newMember);

    await fs.writeFile(personelDataPath, JSON.stringify(personelsData, null, 2));

    res.json({ success: true, ingeneer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const generateHTML = (data) => {
  let html = '';

  data.forEach((personel) => {
    html += `<div>
      <h2>${personel.name}</h2>
      <ul>
        ${personel.members.map((member) => `
          <li>
            <p>Name: ${member.name}</p>
            <p>Contact: ${member.contact}</p>
            <p>Experience: ${member.experience}</p>
          </li>
        `).join('')}
      </ul>
      <ul>
        ${personel.schedule.map((event) => `
          <li>
            <p>ID: ${event.id}</p>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Room: ${event.room}</p>
          </li>
        `).join('')}
      </ul>
    </div>`;
  });

  return html;
};

function convertJsonToXml(jsonData, rootName = 'root') {
  let xml = '';

  const toXml = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const isArray = Array.isArray(value);
        const isObject = typeof value === 'object' && !isArray;

        if (isObject && !isArray) {
          if (key === 'members' || key === 'schedule') {
            xml += `<${key}>`;
            value.forEach((item) => {
              toXml(item);
            });
            xml += `</${key}>`;
          } else {
            xml += `<${key} id="${value.id}">`;
            for (const subKey in value) {
              if (value.hasOwnProperty(subKey)) {
                const subValue = value[subKey];
                const isSubObject = typeof subValue === 'object' && !isArray;

                if (isSubObject) {
                  xml += `<${subKey}>`;
                  toXml(subValue);
                  xml += `</${subKey}>`;
                } else {
                  xml += `<${subKey}>${subValue}</${subKey}>`;
                }
              }
            }
            xml += `</${key}>`;
          }
        } else if (isArray) {
          xml += `<${key}>`;
          value.forEach((item) => {
            toXml(item);
          });
          xml += `</${key}>`;
        } else {
          xml += `<${key}>${value}</${key}>`;
        }
      }
    }
  };

  toXml({ [rootName]: jsonData });

  return xml;
}

app.get('/api/formattedData', async (req, res) => {
  const acceptHeader = req.headers.accept;
  const data = await fs.readFile(personelDataPath, 'utf8');
  if (acceptHeader.includes('application/json')) {
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } else if (acceptHeader.includes('application/xml')) {
    const xmlData = convertJsonToXml(JSON.parse(data));
    res.type('application/xml').send(xmlData);
  } else if (acceptHeader.includes('text/html')) {
    const htmlData = generateHTML(JSON.parse(data));
    res.send(htmlData);
  } else {
    res.status(406).send('Not Acceptable');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});