
export function isAdmin(req, res, next) {
    if (req.roles !== 'admin' && req.roles !== 'superadmin') {
        res.status(401).json({message: 'Permission denied. You need at least Admin roles!', roles : req.roles});
    }
    else {
        next();
    }
};

export function isSuperAdmin(req, res, next) {
    if (req.roles != 'superadmin') {
        res.status(401).json({message: 'Permission denied.' });
    }
    else {
        next();
    }
};


