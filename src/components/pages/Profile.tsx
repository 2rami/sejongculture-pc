import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/Profile.css';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  detailAddress: string;
  postCode: string;
  marketing: boolean;
  sms: boolean;
  email_marketing: boolean;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '김세종',
    email: 'sejong@example.com',
    phone: '010-1234-5678',
    birthDate: '1990-05-15',
    gender: 'male',
    address: '서울특별시 종로구 세종로 175',
    detailAddress: '세종문화회관 101호',
    postCode: '03188',
    marketing: true,
    sms: false,
    email_marketing: true
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    alert('정보가 성공적으로 수정되었습니다.');
  };

  const handleInputChange = (field: keyof ProfileData, value: string | boolean) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage" className="back-link">← 마이페이지</Link>
            <h1>내 정보 수정</h1>
            <p>개인정보를 안전하게 관리하세요</p>
          </div>

          <div className="profile-container">
            <div className="profile-form">
              <div className="form-section">
                <h3>기본 정보</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>이름</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{profileData.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>이메일</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{profileData.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>휴대폰 번호</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{profileData.phone}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>생년월일</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-value">{profileData.birthDate}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>성별</label>
                    {isEditing ? (
                      <select
                        value={editData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="form-select"
                      >
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">기타</option>
                      </select>
                    ) : (
                      <div className="form-value">
                        {profileData.gender === 'male' ? '남성' : 
                         profileData.gender === 'female' ? '여성' : '기타'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>주소 정보</h3>
                <div className="address-grid">
                  <div className="form-group">
                    <label>우편번호</label>
                    {isEditing ? (
                      <div className="postcode-group">
                        <input
                          type="text"
                          value={editData.postCode}
                          onChange={(e) => handleInputChange('postCode', e.target.value)}
                          className="form-input postcode-input"
                          placeholder="우편번호"
                        />
                        <button type="button" className="postcode-btn">
                          우편번호 찾기
                        </button>
                      </div>
                    ) : (
                      <div className="form-value">{profileData.postCode}</div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label>주소</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="form-input"
                        placeholder="주소"
                      />
                    ) : (
                      <div className="form-value">{profileData.address}</div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label>상세주소</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.detailAddress}
                        onChange={(e) => handleInputChange('detailAddress', e.target.value)}
                        className="form-input"
                        placeholder="상세주소"
                      />
                    ) : (
                      <div className="form-value">{profileData.detailAddress}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>알림 설정</h3>
                <div className="notification-grid">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>마케팅 정보 수신</h4>
                      <p>공연 정보, 할인 혜택 등의 마케팅 정보를 받아보세요</p>
                    </div>
                    <div className="notification-toggle">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isEditing ? editData.marketing : profileData.marketing}
                          onChange={(e) => isEditing && handleInputChange('marketing', e.target.checked)}
                          disabled={!isEditing}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>SMS 알림</h4>
                      <p>예매 확인, 공연 일정 등의 SMS 알림을 받아보세요</p>
                    </div>
                    <div className="notification-toggle">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isEditing ? editData.sms : profileData.sms}
                          onChange={(e) => isEditing && handleInputChange('sms', e.target.checked)}
                          disabled={!isEditing}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>이메일 알림</h4>
                      <p>공연 안내, 이벤트 소식 등의 이메일 알림을 받아보세요</p>
                    </div>
                    <div className="notification-toggle">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isEditing ? editData.email_marketing : profileData.email_marketing}
                          onChange={(e) => isEditing && handleInputChange('email_marketing', e.target.checked)}
                          disabled={!isEditing}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                {isEditing ? (
                  <div className="edit-actions">
                    <button type="button" onClick={handleCancel} className="cancel-btn">
                      취소
                    </button>
                    <button type="button" onClick={handleSave} className="save-btn">
                      저장
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={handleEdit} className="edit-btn">
                    정보 수정
                  </button>
                )}
              </div>
            </div>

            <div className="profile-sidebar">
              <div className="security-section">
                <h3>보안 설정</h3>
                <div className="security-actions">
                  <button className="security-btn">
                    <span className="security-icon">🔒</span>
                    <div className="security-info">
                      <h4>비밀번호 변경</h4>
                      <p>주기적인 비밀번호 변경을 권장합니다</p>
                    </div>
                  </button>
                  
                  <button className="security-btn">
                    <span className="security-icon">📱</span>
                    <div className="security-info">
                      <h4>2단계 인증</h4>
                      <p>계정 보안을 강화하세요</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="account-section">
                <h3>계정 관리</h3>
                <div className="account-actions">
                  <button className="account-btn danger">
                    회원 탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}