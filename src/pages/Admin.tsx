import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface User {
  username: string;
  expiryDate: string;
  isAdmin?: boolean;
  hasSetPassword?: boolean;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
    
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
      isAdmin: isAdmin,
      hasSetPassword: false
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    setNewUsername("");
    setExpiryDate("");
    setIsAdmin(false);
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
    <div className="container mx-auto p-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-display">Admin Panel</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="p-8 bg-secondary rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 font-display">Add New User</h2>
          <div className="space-y-6">
            <Input
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="bg-white"
            />
            <Input
              type="datetime-local"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="bg-white"
            />
            <div className="flex items-center space-x-2">
              <Switch
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
                id="admin-mode"
              />
              <Label htmlFor="admin-mode">Grant Admin Privileges</Label>
            </div>
            <Button onClick={addUser} className="w-full">Add User</Button>
          </div>
        </div>

        <div className="p-8 bg-secondary rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 font-display">Manage Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div>
                  <p className="font-medium text-lg">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires: {new Date(user.expiryDate).toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    {user.isAdmin && (
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                    {!user.hasSetPassword && (
                      <span className="text-xs bg-warning text-white px-2 py-1 rounded-full ml-2">
                        Password Not Set
                      </span>
                    )}
                  </div>
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