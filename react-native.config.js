// react-native.config.js
module.exports = {
    project: {
        ios: {},
        android: {}, // grouped into "project"
    },
    assets: ["./assets/fonts/"], // Chỉ định thư mục chứa fonts của bạn
    // Thường là './assets/fonts/' nếu bạn đặt font ở đó
    // Hoặc nếu vector-icons tự quản lý, bạn có thể không cần dòng này
    // nhưng file config trống vẫn cần tồn tại.
    // Thử bỏ dòng assets đi nếu không chắc chắn về thư mục fonts.
};
