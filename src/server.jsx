const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const filePath = './user.json';

// Đọc danh sách người dùng từ file
async function getUserData() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return []; // Nếu có lỗi thì trả về mảng rỗng
    }
}

// Ghi lại danh sách người dùng vào file
async function saveUserData(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// API POST để thêm user mới
app.post('/users', async (req, res) => {
    const users = await getUserData();
    const newUser = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!newUser.name || !newUser.company || !newUser.orderValue || !newUser.orderDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Chuyển tất cả id hiện có về dạng số an toàn
    const numericIds = users
        .map(user => Number(user.id))
        .filter(id => !isNaN(id)); // loại bỏ id không hợp lệ

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

    newUser.id = (maxId + 1).toString();


    users.push(newUser);
    await saveUserData(users);

    res.status(201).json(newUser);
});
// API PUT để sửa thông tin người dùng
// API PUT để cập nhật thông tin người dùng
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    const users = await getUserData();

    const index = users.findIndex(user => user.id.toString() === userId.toString());

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[index] = { ...users[index], ...updatedUser };

    await saveUserData(users);
    res.status(200).json(users[index]);
});




// Khởi chạy server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
