from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN = "INSERT_YOUR_BOT_TOKEN_HERE"  # Replace with your actual bot token
TELEGRAM_CHAT_ID = "INSERT_YOUR_CHAT_ID_HERE"  # Replace with your chat ID or group ID


def send_telegram_message(message):
    """
    Send a message via Telegram Bot API
    """
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML",  # Allows HTML formatting
    }

    try:
        response = requests.post(url, json=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}


def format_user_message(user_data):
    """
    Format user data into a nice Telegram message based on message type
    """
    status_emoji = {"warning": "⚠️", "excellent": "✅", "good": "👍"}

    emoji = status_emoji.get(user_data["status"], "📋")
    message_type = user_data.get("message_type", "SMS")

    if message_type == "Warning":
        # Format warning message
        message = f"""
🚨 <b>URGENT - Waste Management Warning</b> 🚨

⚠️ <b>WARNING NOTICE</b>

👤 <b>Resident:</b> {user_data['user_name']}
📱 <b>Contact:</b> {user_data['phone']}
📍 <b>Address:</b> {user_data['address']}

🔴 <b>Current Status:</b> {user_data['status'].upper()}

📊 <b>Performance Issues:</b>
• Segregation Score: {user_data['segregation_score']}% (Below Standard)
• Total Violations: {user_data['violations']}
• Last Pickup: {user_data['last_pickup']}

⚠️ <b>Issue Details:</b> {user_data['waste_type']}

📋 <b>Required Actions:</b>
• Improve waste segregation immediately
• Follow municipal waste guidelines
• Contact us for guidance: [Municipality Contact]

⏰ <b>Response Required:</b> Within 48 hours
💰 <b>Note:</b> Continued violations may result in penalties

🕒 <b>Warning Issued:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

<i>This is an official notice from Eco-Notify Waste Management System</i>
"""
    else:
        # Format regular SMS/notification message
        message = f"""
🗑️ <b>Eco-Notify - Waste Management Update</b>

{emoji} <b>User Status Update</b>

👤 <b>Name:</b> {user_data['user_name']}
📱 <b>Phone:</b> {user_data['phone']}
📍 <b>Address:</b> {user_data['address']}

📊 <b>Performance Metrics:</b>
• Status: {user_data['status'].title()}
• Segregation Score: {user_data['segregation_score']}%
• Violations: {user_data['violations']}
• Last Pickup: {user_data['last_pickup']}

📝 <b>Notes:</b> {user_data['waste_type']}

🕒 <b>Sent:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

    return message.strip()


@app.route("/send-telegram", methods=["POST"])
def send_telegram():
    """
    Endpoint to send Telegram messages
    """
    try:
        # Get user data from request
        user_data = request.json

        # Validate required fields
        required_fields = ["user_name", "phone", "address", "status"]
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Format the message
        message = format_user_message(user_data)

        # Send the message
        result = send_telegram_message(message)

        if "error" in result:
            return jsonify({"error": result["error"]}), 500
        elif result.get("ok"):
            return jsonify(
                {
                    "success": True,
                    "message": "Telegram message sent successfully",
                    "telegram_response": result,
                }
            )
        else:
            return (
                jsonify(
                    {
                        "error": "Failed to send Telegram message",
                        "telegram_response": result,
                    }
                ),
                500,
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})


if __name__ == "__main__":
    # Check if bot token is configured
    if TELEGRAM_BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("⚠️  WARNING: Please configure your Telegram Bot Token!")

    if TELEGRAM_CHAT_ID == "YOUR_CHAT_ID_HERE":
        print("⚠️  WARNING: Please configure your Telegram Chat ID!")

    print("🚀 Starting Flask server...")
    print("📱 Telegram Bot integration ready!")
    app.run(debug=True, host="0.0.0.0", port=8000)
