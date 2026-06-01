const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            status: "error",
            message: "Admin Access Denied"
        });
    }

    next();
};

module.exports = adminMiddleware;