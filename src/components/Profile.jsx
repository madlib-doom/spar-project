import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const maleNames = ["john", "michael", "david", "daniel", "paul", "james", "robert"];
  const femaleNames = ["mary", "sarah", "linda", "jennifer", "elizabeth", "anna", "grace"];

  const guessGender = (name, email) => {
    let base = name ? name.split(" ")[0].toLowerCase() : email.split("@")[0].toLowerCase();

    if (maleNames.some(n => base.includes(n))) return "male";
    if (femaleNames.some(n => base.includes(n))) return "female";
    return "unknown";
  };

  const getLoyaltyLevel = (count) => {
    if (count > 10) return { level: "Gold", emoji: "🥇" };
    if (count >= 6) return { level: "Silver", emoji: "🥈" };
    if (count >= 1) return { level: "Bronze", emoji: "🟫" };
    return { level: "New User", emoji: "✨" };
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return navigate("/signin");

    const parsed = JSON.parse(stored);
    const gender = guessGender(parsed.name, parsed.email);

    let avatar = "/images/default-avatar.png";
    if (gender === "male") avatar = "/images/male-avatar.png";
    if (gender === "female") avatar = "/images/female-avatar.png";

    setUser({ ...parsed, avatar });
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  const purchaseCount = user.purchaseCount || 0;
  const loyalty = getLoyaltyLevel(purchaseCount);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">

        <div className="card-header bg-primary text-white d-flex align-items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-circle me-3"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <h3>{user.user_name}'s Profile</h3>
        </div>

        <div className="card-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Total Purchases:</strong> {purchaseCount}</p>

          <p>
            <strong>Loyalty Level:</strong> {loyalty.level} {loyalty.emoji}
          </p>

          {user.coupon && loyalty.level === "Gold" && (
            <p className="text-warning">
              <strong>Your Gold Coupon:</strong> {user.coupon}
            </p>
          )}

          <hr />

          <h5>Order History</h5>
          {user.orderHistory && user.orderHistory.length > 0 ? (
            <ul className="list-group">
              {user.orderHistory.map((order, index) => (
                <li key={index} className="list-group-item">
                  <p><strong>Amount:</strong> KES {order.amount.toLocaleString()}</p>
                  <p><strong>Date:</strong> {order.date}</p>

                  <strong>Products:</strong>
                  <ul>
                    {order.products.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet.</p>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
