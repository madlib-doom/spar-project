import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joined: 'January 2023',
    avatar: '/images/avatar.jpeg', // static image in public/images
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/account/edit');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-circle me-3"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <h3 className="mb-0">{user.name}'s Profile</h3>
        </div>
        <div className="card-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member Since:</strong> {user.joined}</p>

          <button  disabled className="btn btn-outline-primary mt-3" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
