import React, { useState } from 'react';
import UserListPopUp from './UserListPopUp';

const UserList = ({ users, onRoleChange }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.filter(user => user.role !== 'maintainer').map(user => (
                        <tr key={user._id} className="table-row-hover">
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role || <span className="text-muted">Not Assigned</span>}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(user)}>
                                    <i className="bi bi-pencil-square"></i> Edit Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser && (
                <UserListPopUp
                    user={selectedUser}
                    onRoleChange={onRoleChange}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </>
    );
};

export default UserList;
