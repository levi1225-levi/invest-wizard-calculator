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
      return;
    }
    
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, [navigate]);

  const addUser = () => {
    if (!newUsername) {
      toast.error("Please enter a username");
      return;
    }

    if (!expiryDate) {
      toast.error("Please set an expiry date");
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

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={goToDashboard}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-8 pt-24 animate-fade-up">
        <div className="grid gap-6">
          <div className="p-8 bg-secondary/50 rounded-2xl backdrop-blur-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 font-display">Add New User</h2>
            <div className="space-y-6">
              <Input
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="bg-background"
              />
              <Input
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-background"
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

          <div className="p-8 bg-secondary/50 rounded-2xl backdrop-blur-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 font-display">Manage Users</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.username}
                  className="flex justify-between items-center p-6 bg-background rounded-xl shadow-sm"
                >
                  <div>
                    <p className="font-medium text-lg">{user.username}</p>
                    <p className="text-sm text-muted-foreground">
                      Expires: {new Date(user.expiryDate).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      {user.isAdmin && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                      {!user.hasSetPassword && (
                        <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full">
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
      </main>
    </div>
  );
};

export default Admin;