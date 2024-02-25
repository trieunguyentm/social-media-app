## Giới thiệu
* Dự án tạo một mạng xã hội nhỏ, có các chức năng đăng nhập, đăng ký bằng Google, Facebook, Username-password. Người dùng có thể tạo các bài đăng, tương tác với các bài đăng trên hệ thống (like, save). Tìm kiếm người dùng hoặc một bài đăng. Follow hoặc unfollow một người dùng khác...
* Tìm hiểu về NextJS 14 và một số công cụ như Clerk, Mongoose, TailwindCSS
* Giao diện và các API đều được thiết kế bởi kiến trúc của NextJS theo App Router
* Sử dụng thư viện Clerk cho việc xác thực người dùng
## Deloy
* Sử dụng vercel
* Link demo: https://social-media-app-peach-chi.vercel.app/
## Cài đặt
* Clone repository
```git clone https://github.com/trieunguyentm/social-media-app```
* File .env.local, tự cấu hình các biến môi trường sau (tìm hiểu trên Clerk và MongoDB Cloud)
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxxxxxx
  CLERK_SECRET_KEY=xxxxxxxxxxxx
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
  MONGODB_URL=mongodb+srv://xxxxxxxx:xxxxxxxx@cluster0.vfhet8j.mongodb.net/?retryWrites=true&w=majority
  WEBHOOK_SECRET=xxxxxxxx
  ```
* Cài đặt thư viện
``` yarn ``` hoặc ``` npm install ```
* Chạy chương trình
  ``` yarn dev ``` hoặc ```npm run dev```
<img width="1512" alt="image" src="https://github.com/trieunguyentm/social-media-app/assets/100562821/83f61a83-6cfd-4b94-8073-9071bb902c50">
## Khắc phục thêm
* Vấn đề tạo post: Do khi deloy trên Vercel, không cho phép write dữ liệu nên ảnh không thể thêm vào public/uploads -> Lỗi. Cần tải ảnh lên một Storage Cloud, lấy URL và lưu vào database
* Cải thiện điểm performace
* Khi like, save, follow...(hành động ấn icon) cần chuyển đổi màu icon ngay để tăng trải nghiệm người dùng, không đợi API hoàn thành xong rồi mới đổi màu

  
