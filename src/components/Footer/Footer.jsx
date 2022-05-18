import React from 'react';
import * as S from './footer.style';

export default function Footer() {
  return (
    <S.Footer>
      <div className="container">
        <S.FooterInfo>
          <div>© 2022 Shopee. Tất cả các quyền được bảo lưu.</div>
          <S.Language>
            Ngôn ngữ:
            <span>Tiếng Anh</span>
            <span>Tiếng Việt</span>
          </S.Language>
        </S.FooterInfo>
        <S.FooterContent>
          <div>Công ty TNHH Shopee</div>
          <p>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
          <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </S.FooterContent>
      </div>
    </S.Footer>
  );
}
