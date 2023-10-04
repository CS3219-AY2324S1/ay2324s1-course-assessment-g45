import React, { useEffect, useState } from 'react';

const UserListPopUp = ({ user, onRoleChange, onClose }) => {
    const [selectedRole, setSelectedRole] = useState(user.role);

    useEffect(() => {
        setSelectedRole(''); 
    }, [user]);

    const handleRoleSelection = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleRoleAssignment = () => {
        onRoleChange(user, selectedRole);
        onClose();
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Assign Role for <span style={{ color: 'red' }}>{user.username}</span>
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Current Role: <strong>{user.role || "Not Assigned"}</strong></p>
                        <select className="form-select" value={selectedRole} onChange={handleRoleSelection}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleRoleAssignment} 
                            disabled={!selectedRole || selectedRole === user.role}>
                            Assign
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListPopUp;
