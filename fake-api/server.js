import jsonServer from 'json-server';
import auth from 'json-server-auth';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer'; 
import bcrypt from 'bcryptjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);

server.use(jsonServer.bodyParser); 


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'clyvasync@gmail.com', 
    pass: 'yanx nxhz ihur xnpr'     
  }
});

// ==========================================
// <--- MỚI: API QUÊN MẬT KHẨU
// (Phải đặt TRƯỚC server.use(auth) để không bị chặn quyền)
// ==========================================
server.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // 1. Kiểm tra email có trong db.json không
  // Lưu ý: router.db là lodash object
  const user = router.db.get('users').find({ email: email }).value();

  if (!user) {
    return res.status(404).json({ error: "Email không tồn tại trong hệ thống." });
  }

  // 2. Tạo nội dung email
  const mailOptions = {
    from: '"CodeStore Support" <email_cua_ban@gmail.com>', // [THAY ĐỔI]: Email người gửi
    to: email,
    subject: 'CodeStore - Đặt lại mật khẩu',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px; border: 1px solid #e5e5e5; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1d1d1f;">Xin chào ${user.name || 'bạn'},</h2>
        <p style="font-size: 16px; color: #333;">Chúng tôi nhận được yêu cầu khôi phục mật khẩu cho tài khoản CodeStore của bạn.</p>
        <div style="margin: 30px 0;">
          <a href="http://localhost:5173/reset-password?email=${email}" style="background-color: #0071e3; color: white; padding: 14px 28px; text-decoration: none; border-radius: 99px; font-weight: 600; font-size: 16px; display: inline-block;">Đặt lại mật khẩu</a>
        </div>
        <p style="color: #86868b; font-size: 14px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
      </div>
    `
  };

  // 3. Gửi mail
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Đã gửi mail reset tới: ${email}`);
    return res.status(200).json({ message: "Email đã được gửi thành công." });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    return res.status(500).json({ error: "Không thể gửi email lúc này." });
  }
});

// ==========================================
// KẾT THÚC PHẦN MỚI
// ==========================================
// Tìm đoạn server.post('/reset-password-submit'...) và thay bằng đoạn này:

server.post('/reset-password-submit', async (req, res) => {
  // 1. Nhận email thay vì id
  const { email, newPassword } = req.body;

  try {
    // 2. Tìm user trong db.json bằng email
    const userChain = router.db.get('users').find({ email: email });
    const user = userChain.value();

    if (!user) {
      return res.status(404).json({ error: "Email không tồn tại hoặc sai đường dẫn." });
    }

    // 3. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Cập nhật mật khẩu mới
    userChain.assign({ password: hashedPassword }).write();

    return res.status(200).json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi server." });
  }
});
server.use(auth);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server with Auth & Mailer is running on port 3001');
});