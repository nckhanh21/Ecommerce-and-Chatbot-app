import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ColorSelector from '../components/ColorSelector'
import ProductPanel from '../components/ProductPanel'
import { StoreContext } from '../context'
import axios from 'axios'

const CATEGORIES = [
    'bedroom',
    'office',
    'kitchen',
    'living room',
    'kids',
    'dining'
]

const COMPANIES = [
    'ikea',
    'marcos',
    'liddy',
    'caressa'
]

const COLORS = [
    '#0000ff',
    '#000',
    '#ff0000',
    '#ffb900',
    '#00ff00'
]

const products =[
    {
      "id": "recZkNf2kwmdBcqd0",
      "name": "Áo Thun Nam CỔ TRÒN Cao Cấp ( nhiều màu) Tay Ngắn, chất cotton bề mặt vải mềm",
      "price": 25999,
      "image": "https://cf.shopee.vn/file/3ebd3fa1d6ebf4fb62a949384dae0d1c",
      "colors": [
        "#ff0000",
        "#00ff00",
        "#0000ff"
      ],
      "company": "marcos",
      "description": "Áo thun nam trơn vải cotton cao cấp mềm mịn, áo phông nam đẹp ngắn tay có đủ bảng màu cực hot PAZZIN STORE hân hạnh được phục vụ quý khách. Những sản phẩm mới nhất vẫn liên tục được cập nhật mỗi ngày phù hợp với nhiều lứa tuổi. 1. GIỚI THIỆU SẢN PHẨM - Áo phông nam là sự lựa chọn hoàn hảo cho các chàng trai. Áo màu trung tính rất dễ mặc, form áo vừa vặn cơ thể, thoải mái theo từng cử động. - Màu sắc trung tính và phối màu tuyệt vời mà rất ít áo có tạo nên sự dễ dàng trong việc phối đồ và tạo ra cho mình nhiều phong cách khác nhau. - Áo được làm từ chất liệucotton co giãn với bề mặt vải mềm mại, thấm hút mồ hôi tốt tạo cảm giác thoải mái, thoáng mát cho người mặc. Đây cũng là chất liệu dễ giặt sạch, giúp bạn tiết kiệm một khoảng thời gian đáng kể. - Áo chống nhăn tốt, dễ giặt sạch, nhanh khô. -Giặt tay hay giặt máy thoải mái không sợ ra màu, nhăn , mất form 2. THÔNG TIN SẢN PHẨM - Chất liệu: 100% chất cotton cá sấu, thấm hút mồ hôi , giặt không ra màu , không mất form - Các Size S - M - L- XL- XXL - XXXL + Size S : 40-43 kg cao 1m45-1m58 + Size M : 44 - 54 kg cao 1m55 - 1m65 + Size L : 55 - 62kg cao 1m63 - 1m74 + Size XL : 63- 71kg cao 1m65 - 1m77 + Size XXL : 72 - 79kg cao 1m68 - 1m82 + Size XXXL : 80 - 85kg cao 1m70 - 1m90 - Màu sắc : Đen , trắng , Xanh Bích , Xanh Thiên Thanh , Xanh đen , Đỏ Tươi , Đỏ Đô , Vàng , Biển , Cam , Xanh Ya , Xanh Két , Xanh Lá , Xanh cốm , Xám Đậm , Xám Lợt , Màu nâu , Xanh Vịt - Form áo slim dễ phối đồ 3. CHÍNH SÁCH BÁN HÀNG: - FREESHIP hoặc hỗ trợ 40K cho đơn hàng từ 99K toàn quốc - Ngoài ra, Chúng tôi tặng mã voucher hoặc hoàn xu cho toàn bộ đơn hàng - Cam kết chất lượng và mẫu mã sản phẩm giống với hình ảnh. - Hoàn tiền nếu sản phẩm không giống với mô tả. - Cam kết được đổi trả hàng trong vòng 2 ngày. 4. HƯỚNG DẪN CÁCH ĐẶT HÀNG - Bước 1: Cách chọn size, shop có bảng size mẫu. Bạn NÊN INBOX, cung cấp chiều cao, cân nặng để SHOP TƯ VẤN SIZE - Bước 2: Cách đặt hàng: Nếu bạn muốn mua 2 sản phẩm khác nhau hoặc 2 size khác nhau, để được freeship + Bạn chọn từng sản phẩm rồi thêm vào giỏ hàng + Khi giỏ hàng đã có đầy đủ các sản phẩm cần mua, bạn mới tiến hành ấn nút “ Thanh toán” - Shop luôn sẵn sàng trả lời inbox để tư vấn.",
      "category": "office",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recEHmzvupvT8ZONH",
      "name": "Áo Thun Nam trơn Cổ Tròn Cao Cấp phông Tay Ngắn, chất cotton bề mặt vải mềm DiHu store",
      "price": 109999,
      "image": "https://cf.shopee.vn/file/e5310c5c331ba38b280dd089b63e4263",
      "colors": [
        "#000",
        "#ffb900"
      ],
      "company": "liddy",
      "description": "Áo Thun Nam Cổ Tròn Cao Cấp ( nhiều màu) Tay Ngắn, chất cotton bề mặt vải mềm DuHu-fashion kinh mời khách hàng tham quan gian hàng nha DiHu Áo thun nam trơn vải cotton cao cấp mềm mịn, áo phông nam đẹp ngắn tay có đủ bảng màu cực hot hân hạnh được phục vụ quý khách. Những sản phẩm mới nhất vẫn liên tục được cập nhật mỗi ngày phù hợp với nhiều lứa tuổi. 1. GIỚI THIỆU SẢN PHẨM áo thun nam - Áo phông nam là sự lựa chọn hoàn hảo cho các chàng trai. Áo màu trung tính rất dễ mặc, form áo vừa vặn cơ thể, thoải mái theo từng cử động.nam - Màu sắc trung tính cổ tròn , ngắn tay và phối màu tuyệt vời mà rất ít áo có tạo nên sự dễ dàng trong việc phối đồ và tạo ra cho mình nhiều phong cách khác nhau. - Áo được làm từ chất liệu cotton co giãn với bề mặt vải mềm mại, thấm hút mồ hôi tốt tạo cảm giác thoải mái, thoáng mát cho người mặc. Đây cũng là chất liệu dễ giặt sạch, giúp bạn tiết kiệm một khoảng thời gian đáng kể. - Áo thun nam chống nhăn tốt, dễ giặt sạch, nhanh khô. -Giặt tay hay giặt máy thoải mái không sợ ra màu, nhăn , mất form",
      "category": "living room",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rec5NBwZ5zCD9nfF0",
      "name": "Áo thun polo nam thể thao LADOS - 9080 có cổ bẻ, vải thun lạnh, phông rộng",
      "price": 139.000,
      "image": "https://cf.shopee.vn/file/10dbc3bb11c92d60905ee3fbd1d38d36",
      "colors": [
        "#ffb900",
        "#0000ff"
      ],
      "company": "liddy",
      "description": "Áo Thun Nam Cổ Tròn Cao Cấp ( nhiều màu) Tay Ngắn, chất cotton bề mặt vải mềm DuHu-fashion kinh mời khách hàng tham quan gian hàng nha DiHu Áo thun nam trơn vải cotton cao cấp mềm mịn, áo phông nam đẹp ngắn tay có đủ bảng màu cực hot hân hạnh được phục vụ quý khách. Những sản phẩm mới nhất vẫn liên tục được cập nhật mỗi ngày phù hợp với nhiều lứa tuổi. 1. GIỚI THIỆU SẢN PHẨM áo thun nam - Áo phông nam là sự lựa chọn hoàn hảo cho các chàng trai. Áo màu trung tính rất dễ mặc, form áo vừa vặn cơ thể, thoải mái theo từng cử động.nam - Màu sắc trung tính cổ tròn , ngắn tay và phối màu tuyệt vời mà rất ít áo có tạo nên sự dễ dàng trong việc phối đồ và tạo ra cho mình nhiều phong cách khác nhau. - Áo được làm từ chất liệu cotton co giãn với bề mặt vải mềm mại, thấm hút mồ hôi tốt tạo cảm giác thoải mái, thoáng mát cho người mặc. Đây cũng là chất liệu dễ giặt sạch, giúp bạn tiết kiệm một khoảng thời gian đáng kể. - Áo thun nam chống nhăn tốt, dễ giặt sạch, nhanh khô. -Giặt tay hay giặt máy thoải mái không sợ ra màu, nhăn , mất form",
      "category": "kitchen",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recd1jIVIEChmiwhe",
      "name": "Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand - AO_THUN_DVR (V427)",
      "price": 89.000,
      "image": "https://cf.shopee.vn/file/81db3aec45e555ada18535a4f2383b88",
      "colors": [
        "#000",
        "#00ff00",
        "#0000ff"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recoM2MyHJGHLVi5l",
      "name": "Áo thun phông logo tay nam nữ PINK tay lỡ form rộng SANJATI Unisex",
      "price": 139.000,
      "image": "https://cf.shopee.vn/file/7692991141cbc2cb5c540d40dc38a041",
      "colors": [
        "#000"
      ],
      "company": "liddy",
      "description": "MÔ TẢ SẢN PHẨM! Shop ÁO THUN SỈ VÀ LẺ Kính Chào Qúy Khách! Luôn luôn cập nhật những mẫu mã mới , đa dạng – Áo Thun Sỉ & Lẻ hứa hẹn sẽ luôn đem lại cho bạn những sản phẩm thời trang ưng ý và hoàn hảo nhất. Áo Thun Sỉ & Lẻ CAM KẾT 👉 Về sản phẩm: Shop cam kết cả về CHẤT LIỆU cũng như HÌNH DÁNG ( đúng với những gì được nêu bật trong phần mô tả sản phẩm). 👉 Về giá cả : Shop nhập với số lượng nhiều và trực tiếp nên chi phí sẽ là RẺ NHẤT nhé. 👉 Về dịch vụ: Shop sẽ cố gắng trả lời hết những thắc mắc xoay quanh sản phẩm nhé. 👉 Thời gian chuẩn bị hàng: Hàng có sẵn, thời gian chuẩn bị tối ưu nhất. - Nhu cầu may in áo thun giá rẻ chất lượng tốt rất được nhu cầu thị trường quan tâm - Chúng tôi xin giới thiệu dịch vụ In Áo Thun Theo Yêu Cầu Giá Rẻ Tại TP. HCM - Mực in sắc nét đẹp, không phai màu, không độc hại cho sức khỏe 💥 SIÊU SALE MÙA ĐÔNG 👕 Form đẹp freesize từ 35 kí đến 75 kí 😍 Chất liệu : vải cotton thấm hút mồ hôi, thoáng mát, không xù lông, mềm mịn",
      "category": "dining",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recotY5Nh00DQFdkm",
      "name": "dining table",
      "price": 42999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/7a38cf782907773d9900165530cfa583/d9f41960",
      "colors": [
        "#00ff00",
        "#0000ff",
        "#ff0000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "dining",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rec1Ntk7siEEW9ha1",
      "name": "emperor bed",
      "price": 23999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/0446e84c5bca9643de3452a61b2d6195/1b32f48b",
      "colors": [
        "#0000ff",
        "#000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recNZ0koOqEmilmoz",
      "name": "entertainment center",
      "price": 59999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/65708b701baa3a84883ad48301624b44/2de058af",
      "featured": true,
      "colors": [
        "#000",
        "#ff0000"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recrfxv3EwpvJwvjq",
      "name": "high-back bench",
      "price": 39999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/1af97a4d3eb28563962d8e3520727ffc/1b9cc17f",
      "featured": true,
      "colors": [
        "#000",
        "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recoW8ecgjtKx2Sj2",
      "name": "leather chair",
      "price": 20099,
      "image": "https://dl.airtable.com/.attachmentThumbnails/d3174ad774fc628e1d50b77e3bec399f/1de7b97a",
      "colors": [
        "#ff0000",
        "#ffb900",
        "#00ff00"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recEOA6qtDag1hRbU",
      "name": "leather sofa",
      "price": 99999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/a2f371071cf292badbb621294758b600/ca963b31",
      "colors": [
        "#00ff00",
        "#0000ff"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recoAJYUCuEKxcPSr",
      "name": "modern bookshelf",
      "price": 31999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/1e4a818f5184993e430420a152315b40/873c7094",
      "featured": true,
      "colors": [
        "#ffb900",
        "#ff0000",
        "#00ff00"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "kids",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recQ0fMd8T0Vk211E",
      "name": "modern poster",
      "price": 3099,
      "image": "https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359",
      "colors": [
        "#000"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rec7CjDWKRgNQtrKe",
      "name": "shelf",
      "price": 30999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/2fd8fb02cc6fa5620504de41fbb662f9/3157a507",
      "colors": [
        "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recF0KpwlkF7e8kXO",
      "name": "simple chair",
      "price": 109999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/c9d46754faf94d2283e15ac3b8accb9a/a6c343c8",
      "colors": [
        "#0000ff"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recs5BSVU3qQrOj4E",
      "name": "sofa set",
      "price": 129999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/fe9d4f25fee307f6ae5b7a462b70b942/031464c4",
      "colors": [
        "#00ff00",
        "#ffb900"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recroK1VD8qVdMP5H",
      "name": "suede armchair",
      "price": 15999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/1cf03bfcee117bd92273d996a82a1534/47ef57c7",
      "colors": [
        "#ffb900"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rec7JInsuCEHgmaGe",
      "name": "utopia sofa",
      "price": 79999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/5ebc46a9e31a09cbc6078190ab035abc/8480b064",
      "featured": true,
      "colors": [
        "#ff0000",
        "#00ff00"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rec3jeKnhInKHJuz2",
      "name": "vase table",
      "price": 120999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/1e222e36e935db2695c33e3d30c2e482/91b542e0",
      "featured": true,
      "colors": [
        "#ff0000"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recv2ohxljlK2FZO7",
      "name": "wooden bed",
      "price": 250099,
      "image": "https://dl.airtable.com/.attachmentThumbnails/1d692023f254ca11a3d1a3628d198081/e922a771",
      "colors": [
        "#000",
        "#ffb900"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recJIjREF3dlFi3sR",
      "name": "wooden desk",
      "price": 150999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/e3fa7aa6dc112c4998da18bb401bd70f/61e2fb5e",
      "colors": [
        "#000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "recm7wC8TBVdU9oEL",
      "name": "wooden desk",
      "price": 40099,
      "image": "https://dl.airtable.com/.attachmentThumbnails/954dfa5c8ce3df84a3c7254481464366/a3bd8c4a",
      "colors": [
        "#0000ff",
        "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    },
    {
      "id": "rectfNsySwAJeWDN2",
      "name": "wooden table",
      "price": 234999,
      "image": "https://dl.airtable.com/.attachmentThumbnails/e8c2f821d05b9e4e5aa450a19e62ffa5/271fc3f5",
      "featured": true,
      "colors": [
        "#ffb900",
        "#ff0000"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "kitchen",
      "shipping": true,
      "reviews": 25,
      "stars": 4.9,
      "stock": 3
    }
  ]


export default function Products() {


    const {
        query, setQuery,
        categoryIndex, setCategoryIndex,
        freeShipping, setFreeShipping,
        price, setPrice,
        colorIndex, setColorIndex,
        companyIndex, setCompanyIndex,
        sortByIndex, setSortByIndex,
        viewGrid, setViewGrid,
        clearFilters
    } = useContext(StoreContext)

    const filteredProducts = products && products.filter(product => {
        if (
            (query.trim() !== '' && !product.name.includes(query.trim().toLowerCase())) ||
            ((categoryIndex > -1 && categoryIndex < 6) && product.category !== CATEGORIES[categoryIndex]) ||
            ((companyIndex > -1 && companyIndex < 4) && product.company !== COMPANIES[companyIndex]) ||
            ((colorIndex > -1 && colorIndex < 5) && product.colors.find(c => c !== COLORS[colorIndex])) ||
            (product.price > price) ||
            (freeShipping && (!product.hasOwnProperty('shipping') || !product.shipping))
        ) return false;
        return true;
    })

    const sortProducts = (products, index) => {
        if (index < 0 || index > 4) return products;
        switch (index) {
            case 0:
                return products.sort((a, b) => a.price - b.price);
            case 1:
                return products.sort((a, b) => a.price - b.price).reverse();
            case 2:
                return products.sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    if (aName < bName) return -1;
                    if (aName > bName) return 1;
                    return 0;
                });
            case 3:
                return products.sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    if (aName < bName) return -1;
                    if (aName > bName) return 1;
                    return 0;
                }).reverse();
            default:
                return products;
        }
    }

    return (
        <>
            <Breadcrumbs>
                <Link to='/'>Home</Link>
                <span>Products</span>
            </Breadcrumbs>
            <section>
                <div className="tw-container py-10 flex flex-col md:flex-row gap-10">
                    <section id="filters">
                        <div className="sticky top-10 flex flex-col gap-4">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search"
                                value={query}
                                className="bg-gray-200 w-5/12 md:w-full py-1 px-2 rounded"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {/* Categories */}
                            <div id="categories">
                                <h5>Category</h5>
                                <ul className="mt-2">
                                    <li>
                                        <button
                                            onClick={() => setCategoryIndex(-1)}
                                            className={`${categoryIndex === -1 ? 'underline' : ''}`}
                                        >All</button>
                                    </li>
                                    {
                                        CATEGORIES.map((category, i) => (
                                            <li key={i} className="capitalize">
                                                <button
                                                    onClick={() => setCategoryIndex(i)}
                                                    className={`${categoryIndex === i ? 'underline' : ''}`}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* Companies */}
                            <div id="companies-form">
                                <h5>Company</h5>
                                <select className="mt-2" value={companyIndex} onChange={(e) => setCompanyIndex(parseInt(e.target.value))}>
                                    <option value={-1}>all</option>
                                    {
                                        COMPANIES.map((company, i) => (
                                            <option key={i} value={i}>{company}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* Colors */}
                            <div id="colors">
                                <h5>Colors</h5>
                                <div className="mt-2 flex items-center gap-3">
                                    <button
                                        onClick={() => setColorIndex(-1)}
                                        className={`${colorIndex === -1 ? 'underline' : ''}`}
                                    >All</button>
                                    <ColorSelector
                                        colors={COLORS}
                                        index={colorIndex}
                                        setIndex={setColorIndex}
                                    />
                                </div>
                            </div>
                            {/* Price */}
                            <div id="price-range">
                                <h5>Price</h5>
                                <p className="mt-2">{price.toCurrency()}</p>
                                <input
                                    type="range"
                                    min={0}
                                    max={309999}
                                    onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
                                    value={price}
                                />
                            </div>
                            {/* Free Shipping */}
                            <div id="free-shipping" className="flex gap-1 items-center">
                                <label>Free Shipping</label>
                                <input
                                    type="checkbox"
                                    checked={freeShipping}
                                    onChange={() => setFreeShipping(state => !state)}
                                />
                            </div>
                            <button className="btn-sm bg-red-300 text-red-900 font-bold" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    </section>
                    <section id="products" className="w-full">
                        <article id="list-header" className={"flex flex-col md:grid md:items-center gap-y-2 gap-x-6"} style={{ gridTemplateColumns: 'auto auto 1fr auto' }}>
                            <div className="btn-container">
                                <button
                                    className={`border border-black rounded w-6 md:w-7 p-1 ${viewGrid ? 'bg-black text-white' : ''}`}
                                    onClick={() => setViewGrid(true)}
                                >
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clipRule="evenodd"></path></svg>
                                </button>
                                <button
                                    className={`border border-black rounded w-6 md:w-7 p-1 ${!viewGrid ? 'bg-black text-white' : ''}`}
                                    onClick={() => setViewGrid(false)}
                                >
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <p>{filteredProducts && filteredProducts.length} Products Found</p>
                            <hr />
                            <form>
                                <label>Sort By: </label>
                                <select className="px-2 py-1" value={sortByIndex} onChange={(e) => setSortByIndex(parseInt(e.target.value))}>
                                    <option value={0}>Price (Lowest)</option>
                                    <option value={1}>Price (Highest)</option>
                                    <option value={2}>Name (A-Z)</option>
                                    <option value={3}>Name (Z-A)</option>
                                </select>
                            </form>
                        </article>
                        <article id="products-list">
                            <div className={`mt-6 ${viewGrid ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8" : ''}`}>
                                {
                                    sortProducts(filteredProducts, sortByIndex).map(product => (
                                        <ProductPanel
                                            key={product.id}
                                            {...product}
                                            grid={viewGrid}
                                        />
                                    ))
                                }
                            </div>
                        </article>
                    </section>
                </div>
            </section>
        </>
    )
}