const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/admin-login.html"));
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax"
        });

        res.json({
            success: true,
            redirect: "/api/admin/dashboard"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.dashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../private/admin.html"));
};
exports.updatePage = (req, res) => {
    res.sendFile(path.join(__dirname, "../private/update.html"));
};
exports.actorPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../private/addActor.html"));
};
exports.updateActor = (req, res) => {
    res.sendFile(path.join(__dirname, "../private/updateActor.html"));
};

exports.checkAdmin = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      success: true
    });

  } catch (err) {
    res.json({
      success: false
    });
  }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/api/admin/login");
};
