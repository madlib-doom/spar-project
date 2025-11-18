import React, { useState, useEffect, useRef } from "react";
import "./css/chatbot.css";

const pairs = [
    ["hi|hello|hey|Niaje|Mambo|Wozza", [
        "Hello, how can I assist you today?",
        "Hi there! How can I help?",
        "Wozza!",
        "Poa!",
        "Jambo!"
      ]],
      ["how are you\\??", ["I'm doing great, thanks for asking!", "I'm good, how about you?"]],
      ["I'm fine\\.\\? What about you\\??", ["I'm fine too. Thanks for asking. What are you up to today?"]],
      ["I am interested in buying some parts for my car|What products do you offer|What do you deal in", [
        "We offer a wide range of vehicle auto parts. Can you be more specific?"
      ]],
      ["(.*)(Autopart\\s|What services do you offer )(.*)", [
        "Welcome to Autoparts Engine Shop! We sell engines, rims, tires, transmissions, suspensions and also offer free services like repairs and assembling newly imported car parts."
      ]],
      ["(.*)(Assembling of newly imported vehicles)(.*)", [
        "You want clarification on newly imported vehicles. Bring imported parts to our shop and we can assemble them. Want our location?"
      ]],
      ["(.*)(What about repairs|Do you also offer repairing of vehicles)(.*)", [
        "Yes, we offer minor to major repairs. Want to know our charges or location?"
      ]],
      ["(.*)(Wanna know how much we charge|How much do you charge)(.*)", [
        "Prices are negotiable. Come to the shop to find out."
      ]],
      ["(.*)(Transmission\\s|crankshaft)(.*)", ["Visit our shop to know more. Want the location?"]],
      ["(.*)(engine\\s)(.*)", ["Which engine do you want — 4-cylinder, 6-cylinder, or 8-cylinder?"]],
      ["(.*)(4-cylinder|6-cylinder|8-cylinder)(.*)", [
        "Would you like to know the price? All engines are new."
      ]],
      ["(.*)(Yes)(.*)", ["It is sold for Ksh 67,899."]],
      ["(.*)(Tires)(.*)", ["Which tires do you want — offroad or onroad?"]],
      ["(.*)(Offroad)(.*)", ["We have a wide range. Want me to show them?"]],
      ["(.*)(provide the link)(.*)", ["Here is your link: [link placeholder]"]],
      ["(.*)(Suspension)(.*)", ["Currently out of stock, but I can show the options."]],
      ["(.*)(Please show the ones offered|Yes)(.*)", [
        "Navigating you to our suspensions page so you can see which one fits best."
      ]],
      ["(.*)(Rims)(.*)", ["We have a wide range of rims. I’ll navigate you to the rims page."]],
      ["(.*)(Do you have a physical location|Where are you located)(.*)", [
        "We are located on ABC Road along Main Street. Want our contact details?"
      ]],
      ["(.*)(Please provide me with the contacts)(.*)", [
        "You can contact us through +1-362-8232 or +25479090921."
      ]],
      ["(.*)(Do you also offer deliveries|What if I purchase the product online)(.*)", [
        "Yes, we offer deliveries. Not very frequent though."
      ]],
      ["Thank you|Thanks", ["You are welcome!", "Happy to assist you.", "Happy shopping!"]]
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your AutoParts assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleUserMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setTimeout(() => handleBotResponse(text), 300);
  };

  const handleBotResponse = (userText) => {
    let response = "Sorry, I didn’t understand that. Can you rephrase?";
    for (let [pattern, replies] of pairs) {
      const regex = new RegExp(pattern, "i");
      if (regex.test(userText)) {
        response = replies[Math.floor(Math.random() * replies.length)];
        break;
      }
    }
    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
        <span>💬</span>
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            AutoParts Assistant
            <button className="close-btn" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
    placeholder="Type your message..."
  />
  <button onClick={() => handleUserMessage(input)} className="send-btn">
    <img src="images/download.png" alt="" className="d-block w-100"/>
  </button>
</div>

        </div>
      )}
    </>
  );
};

export default Chatbot;
