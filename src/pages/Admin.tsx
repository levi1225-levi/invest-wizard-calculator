import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface User {
  username: string;
  expiryDate: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
    
    // Load users from localStorage
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, [navigate]);

  const addUser = () => {
    if (!newUsername || !expiryDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const newUser = {
      username: newUsername,
      expiryDate: expiryDate,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    setNewUsername("");
    setExpiryDate("");
    toast.success("User added successfully");
  };

  const removeUser = (username: string) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("User removed successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <Input
              type="datetime-local"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <Button onClick={addUser}>Add User</Button>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center p-4 bg-background rounded"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires: {new Date(user.expiryDate).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeUser(user.username)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;